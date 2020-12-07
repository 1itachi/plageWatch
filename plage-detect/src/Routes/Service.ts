import * as formidable from "formidable"
import * as path from "path"
import { Request, Response } from "express"
import JSDetectorFactory from "../DetectorFactory/JSDetectorFactory"
import PlagiarismRunner from "../PlagiarismRunner/PlagiarismRunner"
import ExtractZipFiles from "./../Extractor/ExtractZipFiles"
import { PlagResult } from "./../Types/PlagResultType"
import { FormidableFiles, FormidableSubmission, FormidableFields } from "./../Types/FormidableType"
//Fixed submission directories
const submission1Directory: string = "/Submissions/Submission1"
const submission2Directory: string = "/Submissions/Submission2"
//Get the submission path directory
const submission1Path: string = path.join(__dirname + '/../', submission1Directory)
const submission2Path: string = path.join(__dirname + '/../', submission2Directory)
//Define maximum file size the application can handle
const MAX_FILE_SIZE = 15 * 1024 * 1024
/**
 * This function takes the request body of two zip files, extracts and runs the plagiarism on the files.
 * @param request request has a body of two zip files
 * @param response response sent back to client includes results of plagiarism or approriate error messages.
 */
async function serveRequest(request: Request, response: Response): Promise<void> {
    const form = new formidable.IncomingForm()
    form.maxFileSize = MAX_FILE_SIZE;
    form.keepExtensions = true;
    let results: Array<PlagResult> = []

    await form.parse(request, async (error: Error, fields: FormidableFields, files: FormidableFiles): Promise<Response<void>> => {

        //If the file size is more than the set value
        if (error) {
            return response.status(400).send([{ "message": "Max File Size exceeded. Maximum size limit is 15mb." }])
        }
        const compressedSub1: FormidableSubmission = files.submission1
        const compressedSub2: FormidableSubmission = files.submission2
        if (
            path.extname(compressedSub1.name) === ".zip" &&
            path.extname(compressedSub2.name) === ".zip"
        ) {
            try {
                //Extract files and dump the files in the directories defined
                await extractfiles(compressedSub1.path, submission1Path, compressedSub2.path, submission2Path)
            }
            //If extracting of files fail
            catch (error) {
                return response.status(400).send([{ "message": "Error in Extracting Files" }])
            }
            try {
                //create a instance of PlagiarismRunner
                const plagiarismRunner = new PlagiarismRunner(submission1Path, submission2Path)
                //create a instance of JSDetectorFactory
                const detectorFactory = new JSDetectorFactory()
                //Run plagiarism
                results.push(await plagiarismRunner.runPlagiarism(detectorFactory))
                //Return results
                return response.status(200).send(results)
            }
            //If there is an error in running plagiarism
            catch (error) {
                //For empty directories
                if (error['message'] === 'empty directory') {
                    return response.status(400).send([{ "message": ".zip files are either contains empty directories or No .js files are present inside directories." }])
                }
                //Run plagiarism fails
                return response.status(400).send([{ "message": "Sorry something went wrong!!" }])
            }
        }
        else {
            //Extra check to make sure only zip files are received
            return response.status(400).send([{ "message": "Only zip folders are accepted" }])
        }
    })
}
//Helper function to extract zip files
async function extractfiles(compressedSub1: string, submission1Path: string, compressedSub2: string, submission2Path: string): Promise<void> {
    const extractZip = new ExtractZipFiles()
    await extractZip.extract(compressedSub1, submission1Path)
    await extractZip.extract(compressedSub2, submission2Path)
}
export default serveRequest;

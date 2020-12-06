import * as formidable from "formidable"
import * as path from "path"
import { Request, Response } from "express"
import JSDetectorFactory from "../DetectorFactory/JSDetectorFactory"
import PlagiarismRunner from "../PlagiarismRunner/PlagiarismRunner"
import ExtractZipFiles from "./../Extractor/ExtractZipFiles"
import { PlagResult } from "./../Types/PlagResultType"
import { FormidableFiles, FormidableSubmission, FormidableFields } from "./../Types/FormidableType"

const submission1Directory: string = "/Submissions/Submission1"
const submission2Directory: string = "/Submissions/Submission2"

const submission1Path: string = path.join(__dirname + '/../', submission1Directory)
const submission2Path: string = path.join(__dirname + '/../', submission2Directory)

const MAX_FILE_SIZE = 15 * 1024 * 1024

async function serveRequest(request: Request, response: Response): Promise<void> {
    const form = formidable({ multiples: true })

    form.maxFileSize = MAX_FILE_SIZE;
    form.keepExtensions = true;

    let results: Array<PlagResult> = []

    await form.parse(request, async (error: Error, fields: FormidableFields, files: FormidableFiles): Promise<void> => {
        if (error) {
            response.status(400).send([{ "message": "Max File Size exceeded. Maximum size limit is 15mb." }])
        }

        const compressedSub1: FormidableSubmission = files.submission1
        const compressedSub2: FormidableSubmission = files.submission2

        if (
            path.extname(compressedSub1.name) === ".zip" &&
            path.extname(compressedSub2.name) === ".zip"
        ) {
            try {
                await extractfiles(compressedSub1.path, submission1Path, compressedSub2.path, submission2Path)
            } catch (error) {
                response.status(400).send([{ "message": "Error in Extracting Files" }])
            }
            try {

                const plagiarismRunner = new PlagiarismRunner(submission1Path, submission2Path)

                const detectorFactory = new JSDetectorFactory()
                results.push(await plagiarismRunner.runPlagiarism(detectorFactory))
                response.status(200).send(results)
            } catch (error) {
                if (error['message'] === 'empty directory') {
                    response.status(400).send([{ "message": ".zip files are either contains empty directories or No .js files are present inside directories." }])
                }

                response.status(400).send([{ "message": "Sorry something went wrong!!" }])
            }
        } else {
            response.status(400).send([{ "message": "Only zip folders are accepted" }])
        }

    })
}

// TODO: add back to servereqeuest
async function extractfiles(compressedSub1: string, submission1Path: string, compressedSub2: string, submission2Path: string): Promise<void> {
    const extractZip = new ExtractZipFiles()
    await extractZip.extract(compressedSub1, submission1Path)
    await extractZip.extract(compressedSub2, submission2Path)
}

export default serveRequest;

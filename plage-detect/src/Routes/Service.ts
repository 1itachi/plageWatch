// const formidable = require("formidable")
import * as formidable from "formidable"
// const path = require("path")
import * as path from "path"
import {Request, Response} from "express"
import JSDetectorFactory from "../DetectorFactory/JSDetectorFactory"
import PlagiarismRunner from "../PlagiarismRunner/PlagiarismRunner"
import ExtractZipFiles from "./../Extractor/ExtractZipFiles"

const submission1Directory: string = "/Submissions/Submission1"
const submission2Directory: string = "/Submissions/Submission2"

const submission1Path: string = path.join(__dirname + '/../', submission1Directory)
const submission2Path: string = path.join(__dirname + '/../', submission2Directory)

const MAX_FILE_SIZE = 15 * 1024 * 1024

async function serveRequest(request: any, response): Promise<any> {
        const form = formidable({ multiples: true })

        form.maxFileSize = MAX_FILE_SIZE;
        form.keepExtensions = true;

        let results: Array<any> = []

        await form.parse(request, async (error: any, fields: any, files: any) => {
            if (error){
                return response.status(400).send([{"message":"Max File Size exceeded. Maximum size limit is 15mb."}]) 
            }
            
            const compressedSub1: any = files.submission1
            const compressedSub2: any = files.submission2
            
            if (
                path.extname(compressedSub1.name) === ".zip" &&
                path.extname(compressedSub2.name) === ".zip"
            ) {
                try {
                    await extractfiles(compressedSub1.path, submission1Path, compressedSub2.path, submission2Path)
                } catch (error) {
                    return response.status(400).send([{"message":"Error in Extracting Files"}])
                }
                try {

                    const plagiarismRunner = new PlagiarismRunner(submission1Path, submission2Path)

                    const detectorFactory = new JSDetectorFactory()
                    results.push(await plagiarismRunner.runPlagiarism(detectorFactory))
                    return response.status(200).send(results)
                } catch (error) {
                    if (error['message']==='empty directory'){
                        return response.status(400).send([{"message":".zip files are either contains empty directories or No .js files are present inside directories."}])
                    }
                    
                    return response.status(400).send([{"message":"Sorry something went wrong!!"}])
                }
            } else {
                return response.status(400).send([{"message":"Only zip folders are accepted"}])
            }

        })
}


async function extractfiles(compressedSub1, submission1Path, compressedSub2, submission2Path): Promise<void> {
    const extractZip = new ExtractZipFiles()
    await extractZip.extract(compressedSub1, submission1Path)
    await extractZip.extract(compressedSub2, submission2Path)
}

export default serveRequest;

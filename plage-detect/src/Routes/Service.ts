const formidable = require("formidable")
const path = require("path")

import JSDetectorFactory from "../DetectorFactory/JSDetectorFactory"
import PlagiarismRunner from "../PlagiarismRunner/PlagiarismRunner"
import ExtractZipFiles from "./../Extractor/ExtractZipFiles"

const submission1Directory: string = "/Submissions/Submission1"
const submission2Directory: string = "/Submissions/Submission2"

const submission1Path: string = path.join(__dirname + '/../', submission1Directory)
const submission2Path: string = path.join(__dirname + '/../', submission2Directory)

async function serveRequest(request: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        const form = formidable({ multiples: true })


        form.maxFileSize = 35 * 1024 * 1024;
        form.keepExtensions = true;

        let results: Array<any> = []

        await form.parse(request, async (error: any, fields: any, files: any) => {
            if (error){
            reject(new Error("Max File Size exceeded, received 15761246 bytes of file data. Maximum size limit is 15mb."))
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
                    reject(new Error("Error in Extracting Files"))
                }
                try {

                    const plagiarismRunner = new PlagiarismRunner(submission1Path, submission2Path)

                    const detectorFactory = new JSDetectorFactory()
                    results.push(await plagiarismRunner.runPlagiarism(detectorFactory))
                    resolve(results)
                } catch (error) {
                    if (error['message']==='empty directory'){
                        reject(new Error(".zip files are either contains empty directories or No .js files are present inside directories."))
                    }
                    
                    reject(new Error("Sorry something went wrong!!"))
                }
            } else {
                reject(new Error("Only zip folders are accepted"))
            }

        })
    })
}

async function extractfiles(compressedSub1, submission1Path, compressedSub2, submission2Path): Promise<void> {
    const extractZip = new ExtractZipFiles()
    await extractZip.extract(compressedSub1, submission1Path)
    await extractZip.extract(compressedSub2, submission2Path)
}

export default serveRequest;

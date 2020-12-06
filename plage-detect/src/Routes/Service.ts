const submission1Directory: string = "/Submissions/Submission1"
const submission2Directory: string = "/Submissions/Submission2"
const formidable = require("formidable")
const path = require("path")

import JSDetectorFactory from "../DetectorFactory/JSDetectorFactory"
import PlagiarismRunner from "../PlagiarismRunner/PlagiarismRunner"
import ExtractZipFiles from "./../Extractor/ExtractZipFiles"

const submission1Path: string = path.join(__dirname+'/../',  submission1Directory)
const submission2Path: string = path.join(__dirname+'/../', submission2Directory)

async function serveRequest(request: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        const form = formidable({ multiples: true })


        form.maxFileSize = 35 * 1024 * 1024;
        form.keepExtensions = true;

        let results = []

        await form.parse(request, async (err: any, fields: any, files: any) => {
            const compressedSub1: any = files.submission1
            const compressedSub2: any = files.submission2
            if (
                path.extname(compressedSub1.name) === ".zip" &&
                path.extname(compressedSub2.name) === ".zip"
            ) {

                await extractfiles(compressedSub1.path, submission1Path, compressedSub2.path, submission2Path)
                try {

                    const plagiarismRunner = new PlagiarismRunner(submission1Path, submission2Path)

                    const detectorFactory = new JSDetectorFactory()
                    results.push(await plagiarismRunner.runPlagiarism(detectorFactory))
                   resolve(results)
                } catch (e) {
                    reject(new Error("Sorry something went wrong!!"))
                }
            } else {
                reject(new Error("Only zip folders are accepted")) // return some error for not being zip
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
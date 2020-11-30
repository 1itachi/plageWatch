import { exception } from "console"

const fs = require("fs")
const path = require("path")
const extract = require("extract-zip")

class ExtractZip {

	private async clearDirectory(directoryPath: string) {
		await fs.readdir(directoryPath, async (err, files) => {
			for (const file of files) {
				try {
					fs.rmdirSync(path.join(directoryPath, file), { recursive: true })
				} catch (err) {
					// console.log(error)
					throw new exception(err)
				}
			}
		})
	}

	private async createDirectory(directoryPath: string) {
		await fs.mkdir(directoryPath,async(err)=>{
			if(err) {
		await this.clearDirectory(directoryPath)
			}
		})
}

	async extractFiles(compressedFilePath: string, submissionPath: string) {
		//check the return type
		await this.createDirectory(submissionPath)
		try {
			await extract(compressedFilePath, { dir: submissionPath })
		} catch (error) {
			// console.log(error);
			throw new exception(error)
		}
	}
}

export default ExtractZip

import { exception } from "console"

const fs = require("fs")
const path = require("path")
const extract = require("extract-zip")
import IExtractor from './IExtractor';

class ExtractZipFiles implements IExtractor {

	private async clearDirectory(directoryPath: string): Promise<void> {
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

	private async createDirectory(directoryPath: string): Promise<void> {
		await fs.mkdir(directoryPath, async (err) => {
			if (err) {
				await this.clearDirectory(directoryPath)
			}
		})
	}

	async extract(compressedFilePath: string, submissionPath: string): Promise<void> {
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

export default ExtractZipFiles

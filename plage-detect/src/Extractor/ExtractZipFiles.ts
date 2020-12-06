const fs = require("fs")
const path = require("path")
const extract = require("extract-zip")
import IExtractor from './IExtractor';

class ExtractZipFiles implements IExtractor {

	private async clearDirectory(directoryPath: string): Promise<void> {

		await fs.readdir(directoryPath, async (error: Error, files: Array<string>) => {
			if (error) {
				throw new Error(error.message)
			}
			for (const file of files) {
				try {
					fs.rmdirSync(path.join(directoryPath, file), { recursive: true })
				} catch (error: any) {
					throw new Error(error)
				}
			}
		})

	}

	private async createDirectory(directoryPath: string): Promise<void> {
		await fs.mkdir(directoryPath, async (error: Error) => {
			if (error) {
				await this.clearDirectory(directoryPath)
			}
		})
	}

	async extract(compressedFilePath: string, submissionPath: string): Promise<void> {
		await this.createDirectory(submissionPath)
		try {
			await extract(compressedFilePath, { dir: submissionPath })
		} catch (error: any) {
			throw new Error(error)
		}
	}
}

export default ExtractZipFiles

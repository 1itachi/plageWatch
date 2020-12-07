const fs = require("fs")
const path = require("path")
const extract = require("extract-zip")
import IExtractor from './IExtractor';

/**
 * Class implements IExtractor. 
 * Extracts zip files to given directory path.
 */
class ExtractZipFiles implements IExtractor {

	// clear directory if is it exists.
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

	// Create directory
	private async createDirectory(directoryPath: string): Promise<void> {
		await fs.mkdir(directoryPath, async (error: Error) => {
			if (error) {
				await this.clearDirectory(directoryPath)
			}
		})
	}

	// Extract the zip
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

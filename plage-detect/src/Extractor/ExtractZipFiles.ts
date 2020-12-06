import { exception } from "console"

const fs = require("fs")
const path = require("path")
const extract = require("extract-zip")
import IExtractor from './IExtractor';

class ExtractZipFiles implements IExtractor {

	private async clearDirectory(directoryPath: string): Promise<void> {
		try{
		await fs.readdir(directoryPath, async (err, files) => {
			
			for (const file of files) {
				try {
					fs.rmdirSync(path.join(directoryPath, file), { recursive: true })
				} catch (err) {
					console.log('err')
					// throw new exception(err)
				}
			}

			if(err){
				console.log('hello')
			}
		})}catch(err){
			console.log('you cant see me')
		}
	}

	private async createDirectory(directoryPath: string): Promise<void> {
		console.log(directoryPath)
		try{
		await fs.mkdir(directoryPath, async (err) => {
			if (err) {
				console.log('error'+err)
				console.log('buhahaha')
				await this.clearDirectory(directoryPath)
			}
		})
	}catch(err){
		console.log('here i am')
	}
	}

	async extract(compressedFilePath: string, submissionPath: string): Promise<void> {
		//check the return type
		try{
		await this.createDirectory(submissionPath)
		}catch(err){
			console.log('rtrt')
		}
		try {
			await extract(compressedFilePath, { dir: submissionPath })
		} catch (error) {
			// console.log(error);
			throw new exception(error)
		}
	}
}

export default ExtractZipFiles

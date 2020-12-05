import * as babel from "@babel/core"
const fs = require("fs")
var path = require("path")

export default class ASTNodeGenerator {

	generateASTNodes(folderPath: string, map: any, fileSubmission: {}): any {
		let nodes: Array<any> = []
		let counter = 0

		let allFilePaths: Array<string> = this.getAllFiles(folderPath, [])
		allFilePaths.forEach((path) => {
			//format name to take only names that appear on submitted zip
			let newPath = path.split(/Submission\d{1}[/\\]{1,2}/)[1]
			map[counter] = newPath
			nodes.push(babel.transformFileSync(path, { ast: true }).ast)
			const content = fs.readFileSync(path, "utf-8")
			fileSubmission[newPath] = content
			counter = counter + 1
		})

		return nodes
	}

	getAllFiles = (dirPath, arrayOfFiles): Array<string> => {
		let files = fs.readdirSync(dirPath)
		files.forEach((file) => {
			if (fs.statSync(dirPath + "/" + file).isDirectory()) {
				arrayOfFiles = this.getAllFiles(dirPath + "/" + file, arrayOfFiles)
			} else {
				if (file.endsWith(".js"))
					arrayOfFiles.push(path.join(dirPath, "/", file))
			}
		})
		return arrayOfFiles
	}
}

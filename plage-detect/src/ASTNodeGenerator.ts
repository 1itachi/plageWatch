import * as babel from "@babel/core"
const fs = require("fs")

export default class ASTNodeGenerator {

	generateASTNodes(filesPathArray: Array<string>, map: any, fileSubmission: {}): any {
		let nodes: Array<any> = []
		let counter = 0

		filesPathArray.forEach((path) => {
			//format name to take only names that appear on submitted zip
			let newPath = path.split("Submissions\\")[1]
			map[counter] = newPath
			nodes.push(babel.transformFileSync(path, { ast: true }).ast)
			fileSubmission[newPath] = fs.readFileSync(path, "utf-8")
			counter = counter + 1
		})
		return nodes
	}
}

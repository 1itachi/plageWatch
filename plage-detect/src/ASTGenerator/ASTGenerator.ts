import IASTGenerator from "./IASTGenerator"
import * as babel from "@babel/core"
import { SubmissionCode, SubmissionMap } from "../Types/PlagResultType"
const fs = require("fs")

/**
 * Class implements IASTGenerator.
 * Implements method that takes in path and generate all root nodes.
 */
class ASTGenerator implements IASTGenerator {
  private fileMap: SubmissionMap
  private mapFileToContent: SubmissionCode
  private filePaths: Array<string>

  constructor(filePaths: Array<string>) {
    this.fileMap = {}
    this.mapFileToContent = {}
    this.filePaths = filePaths
  }
  // Method to generate all root nodes.
  generateASTs(): Array<babel.Node> {
    let nodes: Array<babel.Node> = []
    let counter: number = 0
    this.filePaths.forEach((path: string) => {
      let newPath: string = path.split(/Submission\d{1}[/\\]{1,2}/)[1]
      this.fileMap[counter] = newPath
      nodes.push(babel.transformFileSync(path, { ast: true, code:false }).ast)
      const content: string = fs.readFileSync(path, "utf-8")
      this.mapFileToContent[newPath] = content
      counter = counter + 1
    })
    return nodes
  }

  // Method to get the map of file to its content.
  getFileContents(): SubmissionCode {
    return this.mapFileToContent
  }

  // Method to get map of index to the file path.
  getFileMaps(): SubmissionMap {
    return this.fileMap
  }
}

export default ASTGenerator

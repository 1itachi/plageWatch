import IASTGenerator from "./IASTGenerator";
import * as babel from "@babel/core";
const fs = require("fs");

class ASTGenerator implements IASTGenerator {
    private fileMap: any;
    private mapFileToContent: any;
    private filePaths: Array<string>;

    constructor(filePaths: Array<string>) {
        this.fileMap = {};
        this.mapFileToContent = {}
        this.filePaths = filePaths;
    }

    generateASTs(): Array<any> {
        let nodes: Array<any> = []
        let counter = 0
        this.filePaths.forEach((path) => {
            //format name to take only names that appear on submitted zip
            let newPath = path.split(/Submission\d{1}[/\\]{1,2}/)[1]
            this.fileMap[counter] = newPath
            nodes.push(babel.transformFileSync(path, { ast: true }).ast)
            const content = fs.readFileSync(path, "utf-8")
            this.mapFileToContent[newPath] = content
            counter = counter + 1
        })
        return nodes
    }

    getFileContents(): any {
        return this.mapFileToContent;
    }

    getFileMaps(): any {
        return this.fileMap;
    }

}

export default ASTGenerator;
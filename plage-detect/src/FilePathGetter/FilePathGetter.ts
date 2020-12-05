import IFilePathGetter from "./IFilePathGetter"
const fs = require("fs")
var path = require("path")

class FilePathGetter implements IFilePathGetter {

    getFilePaths(directoryPath: string): Array<string> {
        let arrayOfFiles: Array<string> = [];
        return this.getDeepFilePaths(directoryPath, arrayOfFiles)
    }

    private getDeepFilePaths(directoryPath: string, arrayOfFiles: Array<string>): Array<string> {
        let files = fs.readdirSync(directoryPath)
        files.forEach((file) => {
            if (fs.statSync(directoryPath + "/" + file).isDirectory()) {
                arrayOfFiles = this.getDeepFilePaths(directoryPath + "/" + file, arrayOfFiles)
            } else {
                if (file.endsWith(".js")) {
                    arrayOfFiles.push(path.join(directoryPath, "/", file))
                }
            }
        })
        return arrayOfFiles
    }
}

export default FilePathGetter;
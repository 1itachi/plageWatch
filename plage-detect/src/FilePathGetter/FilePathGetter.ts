import IFilePathGetter from "./IFilePathGetter"
const fs = require("fs")
var path = require("path")

/**
 * Class Implements IFilePathGetter interface. 
 * Takes in a directory and fetches all files in all nested directories.
 */
class FilePathGetter implements IFilePathGetter {

    // Method to get all file path in directory and sub directories
    getFilePaths(directoryPath: string): Array<string> {
        let arrayOfFiles: Array<string> = [];
        return this.getDeepFilePaths(directoryPath, arrayOfFiles)
    }

    // helper method to get file paths
    private getDeepFilePaths(directoryPath: string, arrayOfFiles: Array<string>): Array<string> {
        let files = fs.readdirSync(directoryPath)
        files.forEach((file: string) => {
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
// @ts-ignore
import * as fs from "fs";
// @ts-ignore
import * as path from "path";

export default class DirectoryReader {

    getAllFiles(dirPath, arrayOfFiles): Array<string> {
        let files = fs.readdirSync(dirPath)
        arrayOfFiles = arrayOfFiles || []
        files.forEach((file:string) => {
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
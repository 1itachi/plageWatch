const fs = require('fs');
const path = require('path');
const extract = require('extract-zip')

class ExtractZip {



    private clearDirectory(directoryPath: string): void {
        fs.readdir(directoryPath, (err, files) => {
            if (err) console.log(err);

            for (const file of files) {
                fs.unlink(path.join(directoryPath, file), err => {
                    if (err) console.log(err);
                });
            }
            console.log('directory cleared')
        });
    }

    private createDirectory(directoryPath: string): void {
        fs.mkdir(directoryPath, (err) => {
            if (err) {
                this.clearDirectory(directoryPath);
            }
        });
    }

    async extractFiles(compressedFilePath: string, submissionPath: string): Promise<void> { //check the return type
        await extract(compressedFilePath, { dir: submissionPath }, (err) => {
            if (err) console.error('extraction failed.');
        });
    }


}

export default ExtractZip;
import * as babel from '@babel/core';
const fs = require('fs');
var path = require('path');


export default class ASTNodeGenerator {

    //generate the ast node for each file in the directory
    // generateASTNodes(folderPath:string, map:any, fileSubmission: {}):any{
    //     let nodes :Array<any> = [];
    //     let counter = 0;
    //     fs.readdirSync(folderPath).forEach(file=>{
    //         // let code = fs.readFileSync()
    //         let filePath = folderPath+'/'+file;
    //         map[counter] = filePath;
    //         nodes.push(babel.transformFileSync(filePath, {ast:true}).ast);
    //         const content = fs.readFileSync(filePath, 'utf-8');
    //         fileSubmission[filePath] = content;
    //         counter = counter+1;
    //     })
    //     return nodes;
    // }

    generateASTNodes(folderPath:string, map:any, fileSubmission: {}):any{
        let nodes :Array<any> = [];
        let counter = 0;

        let allFilePaths:Array<string> = this.getAllFiles(folderPath, [])

        allFilePaths.forEach(path=>{

            
            map[counter] = path;
            nodes.push(babel.transformFileSync(path, {ast:true}).ast);
            const content = fs.readFileSync(path, 'utf-8');
            fileSubmission[path] = content;
            counter = counter+1;
        })

        return nodes;
      
    }


    getAllFiles = (dirPath, arrayOfFiles):Array<string> =>{
        let files = fs.readdirSync(dirPath)
        arrayOfFiles = arrayOfFiles || []
        files.forEach((file) =>{
          if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = this.getAllFiles(dirPath + "/" + file, arrayOfFiles)
          } else {
            if(file.includes('.js'))  
                arrayOfFiles.push(path.join(dirPath, "/", file))
          }
        })
        return arrayOfFiles
      }
}
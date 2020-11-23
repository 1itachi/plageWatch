import ASTNodeGenerator from "./ASTNodeGenerator";
import CollectNodes from "./CollectNodes";
import DetectPlagiarism from "./DetectPlagiarism";

const fs = require('fs')

function main(){

    let sub1RootNodes = []
    let sub2RootNodes = []
    let sub1FileNameMap = {}
    let sub2FileNameMap = {}
    let totalNumberOfLines = 0
    let sub1AllNodes:Array<Array<any>>
    let sub2AllNodes:Array<Array<any>>

    //generate AST nodes and get all root nodes and map the files
    let generator = new ASTNodeGenerator()
    sub1RootNodes = generator.generateASTNodes('./src/test1', sub1FileNameMap)
    sub2RootNodes = generator.generateASTNodes('./src/test2', sub2FileNameMap)

    // console.log(sub1RootNodes[0])
    

    // console.log(JSON.stringify(sub1RootNodes[0]))
    // console.log(sub1FileNameMap)
    let collectNodes = new CollectNodes()
    sub1AllNodes = collectNodes.collectNodes(sub1RootNodes)
    sub2AllNodes = collectNodes.collectNodes(sub2RootNodes)
    
    // console.log(sub1FileNameMap[0])
    let plagiarismDetector = new DetectPlagiarism(sub1AllNodes, sub2AllNodes,sub1FileNameMap, sub2FileNameMap);
    let result = plagiarismDetector.detect()
    console.log(result)

}



main()
import ASTNodeGenerator from "./ASTNodeGenerator";
import CollectNodes from "./CollectNodes";
import DetectPlagiarism from "./DetectPlagiarism";

const fs = require('fs')

export default function runPlagiarism(){

    let sub1RootNodes = []
    let sub2RootNodes = []
    let sub1FileNameMap = {}
    let sub2FileNameMap = {}
    
    let sub1AllNodes:Array<Array<any>>
    let sub2AllNodes:Array<Array<any>>

    let generator = new ASTNodeGenerator()
    sub1RootNodes = generator.generateASTNodes('./src/test1', sub1FileNameMap)
    sub2RootNodes = generator.generateASTNodes('./src/test2', sub2FileNameMap)


    let collectNodes = new CollectNodes()
    sub1AllNodes = collectNodes.collectNodes(sub1RootNodes)
    sub2AllNodes = collectNodes.collectNodes(sub2RootNodes)
    

    let plagiarismDetector = new DetectPlagiarism(sub1AllNodes, sub2AllNodes,sub1FileNameMap, sub2FileNameMap);
    let result = plagiarismDetector.detect()

    return result

}


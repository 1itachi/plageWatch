import IPlagDetector from "./IPlagDetector";
var _ = require("lodash")
import * as babel from "@babel/core"
import { PlagResult, SimilarityLines, SimilaritySubmissions, SubmissionCode, SubmissionMap } from "../Types/PlagResultType";

class JSPlagDetector implements IPlagDetector {
    private submission1: Array<babel.Node>;
    private submission2: Array<babel.Node>;
    private file1NameMap: SubmissionMap;
    private file2NameMap: SubmissionMap;
    // TODO: check whether this is needed?
    private fileSubmission1: SubmissionCode;
    private fileSubmission2 :SubmissionCode;

    constructor(submission1: Array<babel.Node>, submission2: Array<babel.Node>, file1NameMap: SubmissionMap, file2NameMap: SubmissionMap, fileSubmission1: SubmissionCode, fileSubmission2: SubmissionCode) {
        this.submission1 = submission1;
        this.submission2 = submission2;
        this.file1NameMap = file1NameMap;
        this.file2NameMap = file2NameMap;
        this.fileSubmission1 = fileSubmission1;
        this.fileSubmission2 = fileSubmission2;
    }

    detect(): PlagResult {
        //loop through first submission
        let result: PlagResult = {} as PlagResult
        let totalLinesInSubmission1: number = 0
        let numberOfFilesMatched: number = 0
        let numberOfLinesPlagiarised: number = 0

        const submission1Nodes: Array<Array<babel.Node>> = this.collectNodes(this.submission1);
        const submission2Nodes: Array<Array<babel.Node>> = this.collectNodes(this.submission2);

        submission1Nodes.forEach((file1:Array<babel.Node>, index1:number) => {
            //calculate total number of lines in submission1
            totalLinesInSubmission1 += file1[0].loc.end.line
            let linesPlagiarisedInFile = new Set()
            //each node in the file
            //check each file of submission 2
            submission2Nodes.forEach((file2:Array<babel.Node>, index2: number) => {
                let lineSet1 = new Set()
                let lineSet2 = new Set()

                file1.forEach((node1: babel.Node) => {
                    //check if the node is sub-nested node
                    if (this.checkConditionHelper(node1)) {
                        //check each of nodes of submission 2
                        file2.forEach((node2: babel.Node) => {
                            //check if the node is sub-nested
                            if (this.checkConditionHelper(node2)) {
                                //if plagiarism is found
                                if (this.compareNodes(node1, node2) === true) {
                                    //add lines to sets of file 1
                                    for (let i: number = node1.loc.start.line; i <= node1.loc.end.line; i++) {
                                        lineSet1.add(i)
                                        linesPlagiarisedInFile.add(i)
                                    }

                                    //add lines to sets of file 2
                                    for (let i: number = node2.loc.start.line; i <= node2.loc.end.line; i++) {
                                        lineSet2.add(i)
                                    }
                                }
                            }
                        })
                    }
                })
                //
                //add the lines for respoective files
                if (lineSet1.size !== 0 && lineSet2.size != 0) {
                    numberOfFilesMatched = numberOfFilesMatched + 1
                    let plageObject:SimilaritySubmissions = {} as  SimilaritySubmissions
                    let sub1Object:SimilarityLines = {
                        file: this.file1NameMap[index1],
                        lines: Array.from(lineSet1) as Array<number>,
                    }
                    let sub2Object:SimilarityLines = {
                        file: this.file2NameMap[index2],
                        lines: Array.from(lineSet2) as Array<number>,
                    }

                    plageObject["submission1"] = sub1Object
                    plageObject["submission2"] = sub2Object

                    result[numberOfFilesMatched] = plageObject
                }
            })

            numberOfLinesPlagiarised =
                numberOfLinesPlagiarised + linesPlagiarisedInFile.size
        })

        result.submission1 = this.fileSubmission1
        result.submission2 = this.fileSubmission2
        result.score = (numberOfLinesPlagiarised / totalLinesInSubmission1) * 100
        return result
    }

    private collectNodes(rootNodes: Array<babel.Node>): Array<Array<babel.Node>> {

        let nodesAcrossAllFiles:Array<Array<babel.Node>> = []
        rootNodes.forEach((ele: babel.Node) => {
            let nodesAcrossFile:Array<babel.Node> = []
            babel.traverse(ele, {
                enter(path: babel.NodePath) {
                    nodesAcrossFile.push(path.node)
                },
            })
            nodesAcrossAllFiles.push(nodesAcrossFile)
        })

        return nodesAcrossAllFiles
    }

    private checkConditionHelper(node: any): boolean {
        if (_.has(node, "body") || _.has(node, "expression") || _.has(node, "arguments") || _.has(node, "declarations")){
            //ignore expression statements and call expressions
            if((node["type"]==="ExpressionStatement" || node["type"]==="CallExpression")){
                return false
            }
            return true
        }  
        else
            return false
    }

    private compareNodes(node1: babel.Node, node2: babel.Node): boolean {
        //properties to ignore while comparing

        //if one object is null and other isn't , they are not plagiarised
        if (node1 == null && node2 != null || node1 != null && node2 == null) return false

        //if both objects are null, flag them off as not plagiarised
        if (node1 == null && node2 == null) return true

        let ignoredProperties = [
            "loc",
            "start",
            "range",
            "leadingComments",
            "innerComments",
            "trailingComments",
            "extra",
            "end",
            "sourceType",
            "interpreter",
            "name",
        ]

        //Logic to check the condition 9 * (5+10) && (5+10) * 9 is plagiarised
        if (
            node1 != null &&
            node2 != null &&
            node1.type === "BinaryExpression" &&
            node2.type === "BinaryExpression"
        ) {
            return (
                (this.compareNodes(node1.left, node2.left) &&
                    this.compareNodes(node1.right, node2.right)) ||
                (this.compareNodes(node1.right, node2.left) &&
                    this.compareNodes(node1.left, node2.right))
            )
        }

        //Loop through properties in object 1
        // TODO: is this var or can i change to let
        for (var p in node1) {
            if (ignoredProperties.includes(p)) continue

            //Check property exists on both objects
            if (node1.hasOwnProperty(p) !== node2.hasOwnProperty(p)) return false

            switch (typeof node1[p]) {
                //Deep compare objects
                case "object":
                    if (!this.compareNodes(node1[p], node2[p])) return false
                    break
                //Compare function code
                case "function":
                    if (
                        typeof node2[p] == "undefined" ||
                        (p != "compare" && node1[p].toString() != node2[p].toString())
                    )
                        return false
                    break
                //Compare values
                default:
                    if (node1[p] != node2[p]) return false
            }
        }

        //Check object 2 for any extra properties
         // TODO: is this var or can i change to let
        for (var p in node2) {
            if (ignoredProperties.includes(p)) continue
            if (typeof node1[p] == "undefined") return false
        }
        return true
    }

}

export default JSPlagDetector;
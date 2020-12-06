import IPlagDetector from "./IPlagDetector";
var _ = require("lodash")
import * as babel from "@babel/core"

class JSPlagDetector implements IPlagDetector {
    private submission1: any[];
    private submission2: any[];
    private file1NameMap: any;
    private file2NameMap: any;
    // TODO: check whether this is needed?
    private fileSubmission1 = {}
    private fileSubmission2 = {}

    constructor(submission1: Array<any>, submission2: Array<any>, file1NameMap: any, file2NameMap: any, fileSubmission1: any, fileSubmission2: any) {
        this.submission1 = submission1;
        this.submission2 = submission2;
        this.file1NameMap = file1NameMap;
        this.file2NameMap = file2NameMap;
        this.fileSubmission1 = fileSubmission1;
        this.fileSubmission2 = fileSubmission2
    }

    detect() {
        //loop through first submission
        let result = {}
        let totalLinesInSubmission1 = 0
        let numberOfFilesMatched = 0
        let numberOfLinesPlagiarised = 0

        const submission1Nodes: Array<Array<any>> = this.collectNodes(this.submission1);
        const submission2Nodes: Array<Array<any>> = this.collectNodes(this.submission2);

        submission1Nodes.forEach((file1, index1) => {
            //calculate total number of lines in submission1
            totalLinesInSubmission1 += file1[0].loc.end.line
            let linesPLagiarisedInFile = new Set()
            //each node in the file
            //check each file of submission 2
            submission2Nodes.forEach((file2, index2) => {
                let lineSet1 = new Set()
                let lineSet2 = new Set()

                file1.forEach((node1) => {
                    //check if the node is sub-nested node
                    if (this.checkConditionHelper(node1)) {
                        //check each of nodes of submission 2
                        file2.forEach((node2) => {
                            //check if the node is sub-nested
                            if (this.checkConditionHelper(node2)) {
                                //if plagiarism is found
                                if (this.compareNodes(node1, node2) === true) {
                                    //add lines to sets of file 1
                                    for (let i = node1.loc.start.line; i <= node1.loc.end.line; i++) {
                                        lineSet1.add(i)
                                        linesPLagiarisedInFile.add(i)
                                    }

                                    //add lines to sets of file 2
                                    for (let i = node2.loc.start.line; i <= node2.loc.end.line; i++) {
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
                    let plageObject = {}
                    let sub1Object = {
                        file: this.file1NameMap[index1],
                        lines: Array.from(lineSet1),
                    }
                    let sub2Object = {
                        file: this.file2NameMap[index2],
                        lines: Array.from(lineSet2),
                    }

                    plageObject["submission1"] = sub1Object
                    plageObject["submission2"] = sub2Object

                    result[numberOfFilesMatched] = plageObject
                }
            })

            numberOfLinesPlagiarised =
                numberOfLinesPlagiarised + linesPLagiarisedInFile.size
        })

        result["submission1"] = this.fileSubmission1
        result["submission2"] = this.fileSubmission2
        result["score"] = (numberOfLinesPlagiarised / totalLinesInSubmission1) * 100
        return result
    }

    private collectNodes(rootNodes: Array<any>): Array<Array<any>> {

        let nodesAcrossAllFiles = []
        rootNodes.forEach((ele) => {
            let nodesAcrossFile = []
            babel.traverse(ele, {
                enter(path) {
                    nodesAcrossFile.push(path.node)
                },
            })
            nodesAcrossAllFiles.push(nodesAcrossFile)
        })

        return nodesAcrossAllFiles
    }

    private checkConditionHelper(node: any): boolean {
        if (_.has(node, "body") || _.has(node, "expression") || _.has(node, "arguments") || _.has(node, "init") || _.has(node, "declarations"))
            return true
        else
            return false
    }

    private compareNodes(node1: any, node2: any): boolean {
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
        for (var p in node2) {
            if (ignoredProperties.includes(p)) continue
            if (typeof node1[p] == "undefined") return false
        }
        return true
    }

}

export default JSPlagDetector;
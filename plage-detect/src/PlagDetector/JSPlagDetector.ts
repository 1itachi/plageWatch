import IPlagDetector from "./IPlagDetector"
var _ = require("lodash")
import * as babel from "@babel/core"
import {
	PlagResult,
	SimilarityLines,
	SimilaritySubmissions,
	SubmissionCode,
	SubmissionMap,
} from "../Types/PlagResultType"

/**
 * Class implements IPlagDetector for Javascript.
 */
class JSPlagDetector implements IPlagDetector {
	private submission1: Array<babel.Node>
	private submission2: Array<babel.Node>
	private file1NameMap: SubmissionMap
	private file2NameMap: SubmissionMap

	//Constructor for JSPlagDetector.
	constructor(
		submission1: Array<babel.Node>,
		submission2: Array<babel.Node>,
		file1NameMap: SubmissionMap,
		file2NameMap: SubmissionMap
	) {
		this.submission1 = submission1
		this.submission2 = submission2
		this.file1NameMap = file1NameMap
		this.file2NameMap = file2NameMap
	}

	detect(): PlagResult {
	
		let result: PlagResult = {} as PlagResult
		let totalLinesInSubmission1: number = 0
		let numberOfFilesMatched: number = 0
		let numberOfLinesPlagiarised: number = 0
		
		// get all node from root nodes
		const submission1Nodes: Array<Array<babel.Node>> = this.collectNodes(
			this.submission1
		)
		const submission2Nodes: Array<Array<babel.Node>> = this.collectNodes(
			this.submission2
		)
		
		// loop through first submission.
		submission1Nodes.forEach((file1: Array<babel.Node>, index1: number) => {
			// calculate total number of lines in submission1.
			totalLinesInSubmission1 += file1[0].loc.end.line
			let linesPlagiarisedInFile: Set<number> = new Set()
			// each node in the file
			// check each file of submission 2
			submission2Nodes.forEach((file2: Array<babel.Node>, index2: number) => {
				let lineSet1: Set<number> = new Set()
				let lineSet2: Set<number> = new Set()

				file1.forEach((node1: babel.Node) => {
					// check if the node is sub-nested node.
					if (this.checkConditionHelper(node1)) {
						// check each of nodes of submission 2.
						file2.forEach((node2: babel.Node) => {
							// check if the node is sub-nested.
							if (this.checkConditionHelper(node2)) {
								// if plagiarism is found.
								if (this.compareNodes(node1, node2) === true) {
									// add lines to sets of file 1.
									for (
										let i: number = node1.loc.start.line;
										i <= node1.loc.end.line;
										i++
									) {
										lineSet1.add(i)
										linesPlagiarisedInFile.add(i)
									}

									// add lines to sets of file 2.
									for (
										let i: number = node2.loc.start.line;
										i <= node2.loc.end.line;
										i++
									) {
										lineSet2.add(i)
									}
								}
							}
						})
					}
				})
				
				// add the lines for respective files.
				if (lineSet1.size !== 0 && lineSet2.size != 0) {
					numberOfFilesMatched = numberOfFilesMatched + 1
					let plageObject: SimilaritySubmissions = {} as SimilaritySubmissions
					let sub1Object: SimilarityLines = {
						file: this.file1NameMap[index1],
						lines: Array.from(lineSet1) as Array<number>,
					}
					let sub2Object: SimilarityLines = {
						file: this.file2NameMap[index2],
						lines: Array.from(lineSet2) as Array<number>,
					}

					plageObject.submission1 = sub1Object
					plageObject.submission2 = sub2Object

					result[numberOfFilesMatched] = plageObject
				}
			})

			numberOfLinesPlagiarised =
				numberOfLinesPlagiarised + linesPlagiarisedInFile.size
		})

		// Calculate results score as a ration of all lines plagiarised to total number of lines present.
		result.score = (numberOfLinesPlagiarised / totalLinesInSubmission1) * 100
		return result
	}

	// helper method to collect all nodes from root nodes.
	private collectNodes(rootNodes: Array<babel.Node>): Array<Array<babel.Node>> {
		let nodesAcrossAllFiles: Array<Array<babel.Node>> = []
		rootNodes.forEach((ele: babel.Node) => {
			let nodesAcrossFile: Array<babel.Node> = []
			babel.traverse(ele, {
				enter(path: babel.NodePath) {
					nodesAcrossFile.push(path.node)
				},
			})
			nodesAcrossAllFiles.push(nodesAcrossFile)
		})

		return nodesAcrossAllFiles
	}

	//helper method to check if the required keys exist in the object. 
	private checkConditionHelper(node: any): boolean {
		if (
			_.has(node, "body") ||
			_.has(node, "expression") ||
			_.has(node, "arguments") ||
			_.has(node, "declarations")
		) {
			//ignore expression statements and call expressions
			if (
				node["type"] === "ExpressionStatement" ||
				node["type"] === "CallExpression"
			) {
				return false
			}
			return true
		} else return false
	}

	// Helper method to compare two node objects for similarity
	private compareNodes(node1: babel.Node, node2: babel.Node): boolean {
		// properties to ignore while comparing

		// if both objects are null, flag them off as not plagiarised
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

		// Logic to check the condition 9 * (5+10) && (5+10) * 9 is plagiarised
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

		// Loop through properties in object 1
		// TODO: is this var or can i change to let
		for (var key in node1) {
			if (ignoredProperties.includes(key)) continue

			// Check property exists on both objects
			if (node1.hasOwnProperty(key) !== node2.hasOwnProperty(key)) return false

			switch (typeof node1[key]) {
				// Deep compare objects
				case "object":
					if (!this.compareNodes(node1[key], node2[key])) return false
					break
				// Compare values
				default:
					if (node1[key] != node2[key]) return false
			}
		}

		// Check object 2 for any extra properties
		// TODO: is this var or can i change to let
		for (var key in node2) {
			if (ignoredProperties.includes(key)) continue
			if (typeof node1[key] == "undefined") return false
		}
		return true
	}
}

export default JSPlagDetector

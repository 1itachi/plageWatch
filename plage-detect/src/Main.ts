import ASTNodeGenerator from "./ASTNodeGenerator"
import CollectNodes from "./CollectNodes"
import DetectPlagiarism from "./DetectPlagiarism"
const path = require("path")

export default function runPlagiarism(sub1path, sub2path) {
	let sub1RootNodes = []
	let sub2RootNodes = []
	let sub1FileNameMap = {}
	let sub2FileNameMap = {}
	let fileSubmission1 = {}
	let fileSubmission2 = {}

	let sub1AllNodes: Array<Array<any>>
	let sub2AllNodes: Array<Array<any>>

	let generator = new ASTNodeGenerator()
	sub1RootNodes = generator.generateASTNodes(
		sub1path,
		sub1FileNameMap,
		fileSubmission1
	)
	sub2RootNodes = generator.generateASTNodes(
		sub2path,
		sub2FileNameMap,
		fileSubmission2
	)

	let collectNodes = new CollectNodes()
	sub1AllNodes = collectNodes.collectNodes(sub1RootNodes)
	sub2AllNodes = collectNodes.collectNodes(sub2RootNodes)

	let plagiarismDetector = new DetectPlagiarism(
		sub1AllNodes,
		sub2AllNodes,
		sub1FileNameMap,
		sub2FileNameMap,
		fileSubmission1,
		fileSubmission2
	)
	let result = plagiarismDetector.detect()

	return result
}

// const submission1Directory: string = '/Submissions/Submission1';
// const submission2Directory: string = '/Submissions/Submission2';

// const submission1Path: string = path.join(__dirname, submission1Directory);
// const submission2Path: string = path.join(__dirname, submission2Directory);
// runPlagiarism(submission1Path,submission2Path)

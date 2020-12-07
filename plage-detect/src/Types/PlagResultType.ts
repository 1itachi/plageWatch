//Type for similarity lines object
export type SimilarityLines = {
	file: string
	lines: Array<number>
}

//Type for similarity submissions object
export type SimilaritySubmissions = {
	submission1: SimilarityLines
	submission2: SimilarityLines
}

//Type for Plagiarism result object
export type PlagResult = {
	submission1: SubmissionCode
	submission2: SubmissionCode
	score: number
	[key: number]: SimilaritySubmissions
}

//Type for Submission content object
export type SubmissionCode = {
	[key: string]: string
}

//Type for submission file map object
export type SubmissionMap = {
	[key: number]: string
}

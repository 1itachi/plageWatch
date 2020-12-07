type SimilarityLines = {
    file: string
    lines: Array<number>
}

type SimilaritySubmissions = {
    submission1: SimilarityLines;
    submission2: SimilarityLines;
}

type PlagResult = {
    submission1: SubmissionCode
    submission2: SubmissionCode
    score: number
    [key: number]: SimilaritySubmissions
    message?: string
}
type SubmissionCode = {
    [key: string]: string
}

export default PlagResult;
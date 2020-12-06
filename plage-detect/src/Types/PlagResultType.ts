export type SimilarityLines = {
    file: string
    lines: Array<number>
}

export type SimilaritySubmissions = {
    submission1: SimilarityLines;
    submission2: SimilarityLines;
}

export type PlagResult = {
    submission1: SubmissionCode
    submission2: SubmissionCode
    score: number
    [key: number]: SimilaritySubmissions
}
export type SubmissionCode = {
    [key: string]: string
}
export type SubmissionMap = {
    [key: number]: string
}
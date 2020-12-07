export type FormidableFiles = {
    submission1: FormidableSubmission
    submission2: FormidableSubmission
}
export type FormidableSubmission = {
    size: number
    path: string
    name: string | null
    type: string | null
    lastModifiedDate: Date | null
    hash: string | 'sha1' | 'md5' | 'sha256' | null
}
export type FormidableFields = {
    [key: string]: string
}
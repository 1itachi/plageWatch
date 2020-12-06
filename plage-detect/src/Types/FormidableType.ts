//Type for Formidable Files
export type FormidableFiles = {
	submission1: FormidableSubmission
	submission2: FormidableSubmission
}

//Type for each zip file of Fomidable
export type FormidableSubmission = {
	size: number
	path: string
	name: string | null
	type: string | null
	lastModifiedDate: Date | null
	hash: string | "sha1" | "md5" | "sha256" | null
}

//Type for Fomidable Fields
export type FormidableFields = {
	[key: string]: string
}

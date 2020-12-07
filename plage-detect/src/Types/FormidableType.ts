//Type for Formidable Files
export type FormidableFiles = {
	submission1: FormidableSubmission
	submission2: FormidableSubmission
}

//Type for each zip file of Fomidable
export type FormidableSubmission = {
	size: number;
	path: string;
	name: string;
	type: string;
	lastModifiedDate?: Date;
	hash?: string;

	toJSON(): Object;
}

//Type for Fomidable Fields
export type FormidableFields = {
	[key: string]: string
}

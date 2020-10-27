// Do not generate UML with this.


import { ISubmission } from "./ISubmission";

//Do we need to add the submission name(the details of the student who uploaded the doc?? something to identify the submission)
export class Submission implements ISubmission {
    private submissionData: string;

    constructor(submissionData: string) {
        this.submissionData = submissionData;
    }

    getSubmissionData(): string {
        return this.submissionData;
    }
    getSubmissionId(): string {
        return "123";
    }

}


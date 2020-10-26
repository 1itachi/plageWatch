import { ISubmission } from "./ISubmission";

export class Submission implements ISubmission {
    private readonly submissionId: string;
    private submissionData: string;

    constructor(submissionId: string, submissionData: string) {
        this.submissionId = submissionId;
        this.submissionData = submissionData;
    }

    getSubmissionId(): string { return; }
    getSubmissionData(): string { return; }

}

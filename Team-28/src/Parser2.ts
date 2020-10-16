import { IParser } from "./IParser";
import { ISubmission } from "./ISubmission";

export class Parser implements IParser {

    private submission: ISubmission;
    private submissionData: string;

    constructor(submission: ISubmission, submissionData: string) {
        this.submission = submission;
        this.submissionData = submissionData;
    }

    //why is there 2 submissiondata in this class??
    parse(submissionData: string): string { return; }
}

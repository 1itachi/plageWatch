import { IParser } from "./IParser";
import { ISubmission } from "./ISubmission";

export class Parser implements IParser {

    private submission: ISubmission;

    constructor(submission: ISubmission) {
        this.submission = submission;
    }

    parse(submissionData: string): string { return; }
}

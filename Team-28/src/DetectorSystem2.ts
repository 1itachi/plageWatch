import { ISubmission } from "./ISubmission";

export class DetectorSystem {
    constructor() {
    }
    // should all these methods return boolean to report
    // operation status?
    reportPlagiarism(): void { }

    downloadReport(): void { }
    sendEmail(): void { }

    //is this kind of constructor?
    // should we add 2 attributes for submission?
    uploadSubmission(sub1: ISubmission, sub2: ISubmission) { }
}

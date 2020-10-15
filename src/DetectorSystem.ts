import { ISubmission } from "./ISubmission";

export class DetectorSystem {
    constructor() {
    }
    // should all these methods return boolean to report operation status?
    reportPlagiarism(): void { 
        throw new Error("Method not implemented.");
    }
    // detectPlagiarism(): void { 
    //     throw new Error("Method not implemented.");
    // }
    downloadReport(): void {
        throw new Error("Method not implemented.");
     }
    sendEmail(): void {
        throw new Error("Method not implemented.");
     }

    //is this kind of constructor? should we add 2 attributes for submission?
    uploadSubmission(sub1: ISubmission, sub2: ISubmission) { 
        throw new Error("Method not implemented.");
    }
}
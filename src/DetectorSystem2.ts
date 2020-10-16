import { IDetector } from "./IDetector";
import { ISubmission } from "./ISubmission";

export class DetectorSystem {

    constructor() { }

    reportPlagiarism(): void { }
    downloadReport(): void { }
    sendEmail(): void { }
    uploadSubmission(sub1: ISubmission, sub2: ISubmission) { }
    runPlagiarism(detector: IDetector): void { }
}

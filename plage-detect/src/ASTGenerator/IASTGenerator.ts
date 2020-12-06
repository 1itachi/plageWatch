import { SubmissionCode, SubmissionMap } from "../Types/PlagResultType";

interface IASTGenerator {
    generateASTs(): Array<babel.Node> ;
    getFileContents(): SubmissionCode;
    getFileMaps(): SubmissionMap;
}

export default IASTGenerator;
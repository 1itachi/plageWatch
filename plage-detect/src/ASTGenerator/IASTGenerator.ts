import { SubmissionCode, SubmissionMap } from "../Types/PlagResultType";
import * as babel from "@babel/core";

interface IASTGenerator {
    generateASTs(): Array<babel.Node> ;
    getFileContents(): SubmissionCode;
    getFileMaps(): SubmissionMap;
}

export default IASTGenerator;
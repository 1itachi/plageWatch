import ASTGenerator from "../ASTGenerator/ASTGenerator";
import FilePathGetter from "../FilePathGetter/FilePathGetter";
import JSPlagDetector from "../PlagDetector/JSPlagDetector";
import { SubmissionCode, SubmissionMap } from "../Types/PlagResultType";
import IDetectorFactory from "./IDetectorFactory";
import * as babel from "@babel/core"

class JSDetectorFactory implements IDetectorFactory {
    makeFilePathGetter(): FilePathGetter {
        return new FilePathGetter();
    }
    makeASTGenerator(filePaths: Array<string>): ASTGenerator {
        return new ASTGenerator(filePaths);
    }
    makePlagDetector(submission1: Array<babel.Node>, submission2: Array<babel.Node>, file1NameMap: SubmissionMap, file2NameMap: SubmissionMap, fileSubmission1: SubmissionCode, fileSubmission2: SubmissionCode): JSPlagDetector {
        return new JSPlagDetector(submission1, submission2, file1NameMap, file2NameMap, fileSubmission1, fileSubmission2);
    }
}

export default JSDetectorFactory;
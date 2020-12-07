import ASTGenerator from "../ASTGenerator/ASTGenerator";
import FilePathGetter from "../FilePathGetter/FilePathGetter";
import JSPlagDetector from "../PlagDetector/JSPlagDetector";
import { SubmissionCode, SubmissionMap } from "../Types/PlagResultType";
import IDetectorFactory from "./IDetectorFactory";
import * as babel from "@babel/core"

/**
 * Class implements IDetectorFactory interface for Javascript.
 */
class JSDetectorFactory implements IDetectorFactory {
    // Method to create instance of PathGetter object
    makeFilePathGetter(): FilePathGetter {
        return new FilePathGetter();
    }
    // Method to create instance of ASTGenerator object
    makeASTGenerator(filePaths: Array<string>): ASTGenerator {
        return new ASTGenerator(filePaths);
    }
    // Method to create instance of JSPlagDetector object
    makePlagDetector(submission1: Array<babel.Node>, submission2: Array<babel.Node>, file1NameMap: SubmissionMap, file2NameMap: SubmissionMap): JSPlagDetector {
        return new JSPlagDetector(submission1, submission2, file1NameMap, file2NameMap);
    }
}

export default JSDetectorFactory;
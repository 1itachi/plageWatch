import ASTGenerator from "../ASTGenerator/ASTGenerator";
import ExtractZipFiles from "../Extractor/ExtractZipFiles";
import FilePathGetter from "../FilePathGetter/FilePathGetter";
import JSPlagDetector from "../PlagDetector/JSPlagDetector";
import IDetectorFactory from "./IDetectorFactory";

class JSDetectorFactory implements IDetectorFactory {
    // makeExtractor(): ExtractZipFiles {
    //     return new ExtractZipFiles();
    // }
    makeFilePathGetter(): FilePathGetter {
        return new FilePathGetter();
    }
    makeASTGenerator(filePaths: Array<string>): ASTGenerator {
        return new ASTGenerator(filePaths);
    }
    makePlagDetector(submission1: Array<any>, submission2: Array<any>, file1NameMap: any, file2NameMap: any, fileSubmission1: any, fileSubmission2: any): JSPlagDetector {
        return new JSPlagDetector(submission1, submission2, file1NameMap, file2NameMap, fileSubmission1, fileSubmission2);
    }
}

export default JSDetectorFactory;
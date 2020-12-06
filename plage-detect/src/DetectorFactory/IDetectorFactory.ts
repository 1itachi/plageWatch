import IASTGenerator from "../ASTGenerator/IASTGenerator";
import IExtractor from "../Extractor/IExtractor";
import IFilePathGetter from "../FilePathGetter/IFilePathGetter";
import IPlagDetector from "../PlagDetector/IPlagDetector";

interface IDetectorFactory {
    // makeExtractor():  IExtractor ;
    makeFilePathGetter(): IFilePathGetter;
    makeASTGenerator(filePaths: Array<string>): IASTGenerator;
    makePlagDetector(submission1: Array<any>, submission2: Array<any>, file1NameMap: any, file2NameMap: any, fileSubmission1: any, fileSubmission2: any): IPlagDetector;
}
export default IDetectorFactory;
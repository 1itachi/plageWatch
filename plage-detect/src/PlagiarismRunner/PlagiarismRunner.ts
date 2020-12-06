import IASTGenerator from "../ASTGenerator/IASTGenerator";
import IDetectorFactory from "../DetectorFactory/IDetectorFactory";
import IFilePathGetter from "../FilePathGetter/IFilePathGetter";
import IPlagDetector from "../PlagDetector/IPlagDetector";
import * as babel from "@babel/core";
import { PlagResult, SubmissionCode, SubmissionMap } from "./../Types/PlagResultType";

/**
 *  Class implements runPlagiarims method (Client in Abstract Factory Design pattern)
 */
class PlagiarismRunner {
    private submission1Path: string;
    private submission2Path: string;

    //Constructor for PlagiarismRunner
    constructor(submission1Path: string, submission2Path: string) {
        this.submission1Path = submission1Path;
        this.submission2Path = submission2Path;
    }

    /**
     * Method to run run plagiarism based on the IDetectorFactory and return resultant object.
     * @param detectorFactory Factory input of type IDetectorFactory.
     */
    runPlagiarism(detectorFactory: IDetectorFactory): PlagResult {
        const filePathGetter: IFilePathGetter = detectorFactory.makeFilePathGetter();

        const sub1FilePaths: Array<string> = filePathGetter.getFilePaths(this.submission1Path);
        const sub2FilePaths: Array<string> = filePathGetter.getFilePaths(this.submission2Path);

        //If one of directory is empty or no files of specific type is found.
        if (sub1FilePaths.length === 0 || sub2FilePaths.length === 0) {
            throw new Error('empty directory')
        }

       
        const sub1ASTGen: IASTGenerator = detectorFactory.makeASTGenerator(sub1FilePaths);
        const sub2ASTGen: IASTGenerator = detectorFactory.makeASTGenerator(sub2FilePaths);
        //Generate AST nodes for submission1
        const sub1Nodes: Array<babel.Node> = sub1ASTGen.generateASTs();

        //Get the file content and get mapped filepaths based on index for submission1
        const sub1MapFileToContent: SubmissionCode = sub1ASTGen.getFileContents();
        const sub1FileMaps: SubmissionMap = sub1ASTGen.getFileMaps();

        //Generate AST nodes for submission2
        const sub2Nodes: Array<babel.Node> = sub2ASTGen.generateASTs();
        //Get the file content and get mapped filepaths based on index for submission2
        const sub2MapFileToContent: SubmissionCode = sub2ASTGen.getFileContents();
        const sub2FileMaps: SubmissionMap = sub2ASTGen.getFileMaps();

        //Run plagiarism detect
        const plagDetector: IPlagDetector = detectorFactory.makePlagDetector(sub1Nodes, sub2Nodes, sub1FileMaps, sub2FileMaps, sub1MapFileToContent, sub2MapFileToContent);
        const result: PlagResult = plagDetector.detect()

        //Return result
        return result;

    }
}

export default PlagiarismRunner;
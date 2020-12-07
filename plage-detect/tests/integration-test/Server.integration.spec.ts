import { expect } from 'chai';
import JSDetectorFactory from '../../src/DetectorFactory/JSDetectorFactory';
import PlagiarismRunner from '../../src/PlagiarismRunner/PlagiarismRunner';
import runPlagiarism from '../../src/PlagiarismRunner/PlagiarismRunner';

var _ = require('lodash');

// Integration tests for the run plagiarism server check.

// Declare directories for the tests.
let dir1 = "./tests/resources/Submission/Submission1";
let dir2 = "./tests/resources/Submission/Submission2";
let dir_illegal = './tests/resources/dir_illegal';
let empty = './tests/resources/empty';
let dir1_deeply_nested = './tests/resources/nested';
let dir2_deeply_nested = './tests/resources/nested2';

// Declare the plagiarism factory object.
let plagiarismFactory = new JSDetectorFactory();

// Declare the plagiarism runner objects for each type of tests.
let plagiarismRunnerNormal = new PlagiarismRunner(dir1, dir2);
let plagiarismRunnerEmpty = new PlagiarismRunner(empty, empty);
let plagiarismRunnerIllegal = new PlagiarismRunner(dir_illegal,
    dir_illegal);
let plagiarismRunnerNested = new PlagiarismRunner(dir1_deeply_nested,
    dir2_deeply_nested);

describe('integration tests for student submissions directory', () => {

    // plagiarism check for plagiarism matches between files.
    it('test for number of plagiarism matches with empty file.',
        () => {
            let emptyResult = new PlagiarismRunner(dir1, empty);
            expect(emptyResult.runPlagiarism.bind(
                emptyResult, plagiarismFactory))
                .to.throw("empty directory");
        });

    it('test for plagiarism match in two empty files.',
        () => {
            let emptyBoth = plagiarismRunnerEmpty;
            expect(emptyBoth.runPlagiarism.bind(emptyBoth,
                plagiarismFactory))
                .to.throw("empty directory");
        });

    it('test for number of plagiarism matches.', () => {
        let resultNormal = plagiarismRunnerNormal.runPlagiarism
            (plagiarismFactory);
        expect(_.keys(resultNormal).length).to.equal(4);
    });

    it('test for number of plagiarism matches' +
        ' in same directory.', () => {
            let resultDir1 = new PlagiarismRunner(dir1, dir1)
                .runPlagiarism(plagiarismFactory);
            let resultDir2 = new runPlagiarism(dir2, dir2)
                .runPlagiarism(plagiarismFactory);
            expect(_.keys(resultDir1).length - 3).to.equal
                (_.keys(resultDir2).length - 3);
        });

    it('test for number of plagiarism matches in nested files.', () => {
        let resultNested = plagiarismRunnerNested.runPlagiarism
            (plagiarismFactory);
        expect(_.keys(resultNested).length).to.equal(4);
    });

    // plagiarism check for number of files plagiarized.
    it('test for number of files plagiarized.', () => {
        let filesPlagiarized = plagiarismRunnerNormal.runPlagiarism
            (plagiarismFactory);
        expect(_.values(filesPlagiarized).length).to.equal(4);
    });

    it('test for number of files plagiarized in empty files.', () => {
        let filesPlagiarizedEmpty = plagiarismRunnerEmpty;
        expect(filesPlagiarizedEmpty.runPlagiarism.bind
            (filesPlagiarizedEmpty, plagiarismFactory))
            .to.throw("empty directory");
    });

    it('test for number of files plagiarized after files flushed out.',
        () => {
            let resultBeforeFlush = new PlagiarismRunner(dir1, dir2)
                .runPlagiarism(plagiarismFactory);
            let flushed = (_.values(resultBeforeFlush) === []);
            expect(_.values(flushed).length).to.equal(0);
        });

    // requirements specific tests to avoid detection.
    it('test to avoid detection via renaming variables from'
        + 'number of plagiarisms.', () => {
            let renamedDir1 =
                './tests/resources/Submission/Submission1';
            let resultDetect1 = new PlagiarismRunner(dir1, renamedDir1).
                runPlagiarism(plagiarismFactory);
            let resultDetect2 = new PlagiarismRunner(renamedDir1, dir1)
                .runPlagiarism(plagiarismFactory);
            expect(_.keys(resultDetect1).length - 3).to.equal
                (_.keys(resultDetect2).length - 3);
        });

    it('test to avoid detection via renaming variables from' +
        ' number of files.', () => {
            let renamedDir2 =
                './tests/resources/Submission/Submission2';
            let resultRename1 = new PlagiarismRunner(dir2, renamedDir2)
                .runPlagiarism(plagiarismFactory);
            let resultRename2 = new PlagiarismRunner(renamedDir2, dir2)
                .runPlagiarism(plagiarismFactory);
            expect(_.values(resultRename1).length).to.equal
                (_.values(resultRename2).length);
        });

    it('test to avoid detection via extracing code into functions'
        + ' from number of plagiarisms.', () => {
            let extractDir1 =
                './tests/resources/Submission/Submission1';
            let extractDir2 =
                './tests/resources/Submission/Submission2';
            let resultExtract1 = new PlagiarismRunner(extractDir1,
                extractDir2).runPlagiarism(plagiarismFactory);
            let resultExtract2 = new runPlagiarism(extractDir2,
                extractDir1).runPlagiarism(plagiarismFactory);
            expect(_.keys(resultExtract1).length - 3).
                to.equal(_.keys(resultExtract2).length - 3);
        });

    it('test to avoid detection via moving code '
        + 'from number of plagiarisms.', () => {
            let moveCode1 =
                './tests/resources/Submission/Submission1';
            let moveCode2 =
                './tests/resources/Submission/Submission2';
            let resultMoveCode1 = new runPlagiarism(moveCode1,
                moveCode2)
                .runPlagiarism(plagiarismFactory);
            let resultMoveCode2 = new runPlagiarism(moveCode2,
                moveCode1)
                .runPlagiarism(plagiarismFactory);
            expect(_.keys(resultMoveCode1).length - 3).to.equal
                (_.keys(resultMoveCode2).length - 3);
        });

    it('test to avoid detection via moving code '
        + 'from number of files.', () => {
            let moveCodeFile1 =
                './tests/resources/Submission/Submission1';
            let moveCodeFile2 =
                './tests/resources/Submission/Submission2';
            let resultNumberFiles1 = new PlagiarismRunner(moveCodeFile1,
                moveCodeFile2).runPlagiarism(plagiarismFactory);
            let resultNumberFiles2 = new PlagiarismRunner(moveCodeFile2,
                moveCodeFile1).runPlagiarism(plagiarismFactory);
            expect(_.values(resultNumberFiles1).length).to.equal
                (_.values(resultNumberFiles2).length);
        });

    it('test to avoid detection via changing comments'
        + ' from number of plagiarisms.', () => {
            let changeComments1 =
                './tests/resources/Submission/Submission1';
            let changeComments2 =
                './tests/resources/Submission/Submission2';
            let resultChangeComment1 = new PlagiarismRunner
                (changeComments1, changeComments2).runPlagiarism
                (plagiarismFactory);
            let resultChangeComment2 = new PlagiarismRunner
                (changeComments2, changeComments1).runPlagiarism
                (plagiarismFactory);
            expect(_.keys(resultChangeComment1).length - 3)
                .to.equal(_.keys(resultChangeComment2).length - 3);
        });

    // Additional tests from TA sample file.
    it('test to avoid detection via same copy '
        + 'from number of plagiarisms.', () => {
            let resultAvoidDetectCopy = new PlagiarismRunner(dir1, dir1)
                .runPlagiarism(plagiarismFactory);
            expect(_.keys(resultAvoidDetectCopy).length).to.equal(4);
        });

    it('test to avoid detection via whitespace'
        + ' from number of plagiarisms.', () => {
            let whitespaceNumPlag =
                './tests/resources/Submission/Submission1';
            let resultNumPlag = new PlagiarismRunner(dir1,
                whitespaceNumPlag)
                .runPlagiarism(plagiarismFactory);
            expect(_.keys(resultNumPlag).length - 4).to.equal(0);
        });

    it('test to avoid detection via function swap'
        + ' from number of plagiarisms.', () => {
            let whitespaceFuncPlag =
                './tests/resources/Submission/Submission1';
            let functionSwapPlag =
                './tests/resources/Submission/Submission2';
            let resultFuncPlag = new PlagiarismRunner
                (whitespaceFuncPlag, functionSwapPlag)
                .runPlagiarism(plagiarismFactory);
            expect(_.keys(resultFuncPlag).length - 4).to.equal(0);
        });

    it('test to avoid detection via function renaming'
        + ' from number of plagiarisms.', () => {
            let whitespaceRenamedPlag =
                './tests/resources/Submission/Submission1';
            let renamedPlag =
                './tests/resources/Submission/Submission2';
            let resultRenamedPlag = new PlagiarismRunner
                (whitespaceRenamedPlag, renamedPlag).
                runPlagiarism(plagiarismFactory);
            expect(_.keys(resultRenamedPlag).length - 4).to.equal(0);
        });

    it('test to avoid detection via function reordering'
        + ' from number of plagiarisms.', () => {
            let whitespaceReorderPlag =
                './tests/resources/Submission/Submission1';
            let renamedReorderPlag =
                './tests/resources/Submission/Submission2';
            let resultReorder = new PlagiarismRunner(
                whitespaceReorderPlag, renamedReorderPlag).
                runPlagiarism(plagiarismFactory);
            expect(_.keys(resultReorder).length - 4).to.equal(0);
        });

    it('test to avoid detection via switching loops'
        + ' from number of plagiarisms.', () => {
            let resultSwitchLoop = plagiarismRunnerNormal.
                runPlagiarism(plagiarismFactory);
            expect(_.keys(resultSwitchLoop).length - 4).to.equal(0);
        });

    it('test to avoid detection via extracted code'
        + ' from number of plagiarisms.', () => {
            let resultExtractCode = plagiarismRunnerNormal.
                runPlagiarism(plagiarismFactory);
            expect(_.keys(resultExtractCode).length - 4).to.equal(0);
        });

    // added test after manual check.
    it('test to avoid detection via extracted code'
        + ' from different files.', () => {
            let resultDiffFile = plagiarismRunnerNormal.
                runPlagiarism(plagiarismFactory)
            expect(_.keys(resultDiffFile).length - 4).to.equal(0);
        });

    // Deeply nested file cases.
    it('test for plagiarism match in differently nested files.',
        () => {
            let resultDiffNest1 = new PlagiarismRunner
                (dir1, dir1_deeply_nested).runPlagiarism
                (plagiarismFactory);
            let resultDiffNest2 = new PlagiarismRunner
                (dir2, dir2_deeply_nested).runPlagiarism
                (plagiarismFactory);
            expect(_.keys(resultDiffNest1).length - 3).
                to.equal(_.keys(resultDiffNest2).length - 3);
        });

    it('test for plagiarism match in deeply nested files.',
        () => {
            let resultDeepNest1 = new PlagiarismRunner
                (dir1_deeply_nested, dir2_deeply_nested);
            let resultDeepNest2 = new PlagiarismRunner
                (dir2_deeply_nested, dir1_deeply_nested);
            expect(_.keys(resultDeepNest1).length).to.equal
                (_.keys(resultDeepNest2).length);
        });

    // extraneous cases.
    it('test for number of files plagiarized' +
        ' if there are illegal files in subfolder.',
        () => {
            let resultIllegalFileSub = new PlagiarismRunner
                (dir1_deeply_nested, empty);
            expect(resultIllegalFileSub.runPlagiarism.bind
                (resultIllegalFileSub, plagiarismFactory))
                .to.throw("empty directory");
        });

    it('test for number of files plagiarized' +
        ' if there are empty files in subfolder in first directory.',
        () => {
            let resultEmptyFileSubDir1 = new PlagiarismRunner
                (dir1_deeply_nested, empty);
            expect(resultEmptyFileSubDir1.runPlagiarism.bind
                (resultEmptyFileSubDir1, plagiarismFactory))
                .to.throw("empty directory");
        });

    it('test for number of files plagiarized' +
        ' if there are empty files in subfolder in second directory.',
        () => {
            let resultEmptyFileSubDir2 = new PlagiarismRunner
                (dir_illegal, dir2_deeply_nested);
            expect(resultEmptyFileSubDir2.runPlagiarism.bind
                (resultEmptyFileSubDir2, plagiarismFactory))
                .to.throw("empty directory");
        });

    it('test for number of files plagiarized if all illegal files.',
        () => {
            let resultIllegalFilesAll = plagiarismRunnerIllegal;
            expect(resultIllegalFilesAll.runPlagiarism.bind
                (resultIllegalFilesAll, plagiarismFactory))
                .to.throw("empty directory");
        });
});

import { expect } from 'chai'
import JSDetectorFactory from "../../src/DetectorFactory/JSDetectorFactory";
import FilePathGetter from "../../src/FilePathGetter/FilePathGetter";
import * as path from "path"
new JSDetectorFactory();

const corruptpath: string = "/asdfasdf";

// faulty student file paths.
const multiDeepFilePath: string = path.join(__dirname + '/../../', './tests/resources/Multifile/changed_loops')
const multiFilePath: string = path.join(__dirname + '/../../', './tests/resources/Multifile/changed_loops/Student1')
const singleFilePath: string = path.join(__dirname + '/../../', './tests/resources/Singlefile/changed_loops/file1')
const emptyFilePath: string = path.join(__dirname + '/../../', './tests/resources/empty')
const pyPath: string = path.join(__dirname + '/../../', './tests/resources/MultiLanguage/Submission1')
const pyAndJSPath: string = path.join(__dirname + '/../../', './tests/resources/MultiLanguage')
let filepath = new FilePathGetter();

describe("Unit test for Filepath getter", () => {
    // File paths for faulty submissions.
    it('Call getfilepath method to test for corrupt path. ', () => {
        expect(() => {
            filepath.getFilePaths(corruptpath)
        }).to.throw("ENOENT: no such file or directory, scandir "
            + "'" + corruptpath + "'");
    })

    it('Call getfilepath method to test for directories with deep files', () => {
        const deepFiles: Array<string> = [path.join(__dirname + '/../../', './tests/resources/Multifile/changed_loops/Student1/file1.js'),
        path.join(__dirname + '/../../', './tests/resources/Multifile/changed_loops/Student1/file2.js'),
        path.join(__dirname + '/../../', './tests/resources/Multifile/changed_loops/Student2/file1.js'),
        path.join(__dirname + '/../../', './tests/resources/Multifile/changed_loops/Student2/file2.js')]
        expect(filepath.getFilePaths(multiDeepFilePath)).to.deep.equal(deepFiles)
    })

    it('Call getfilepath method to test for directory with multiple files ', () => {
        const multiFiles: Array<string> = [path.join(__dirname + '/../../', './tests/resources/Multifile/changed_loops/Student1/file1.js'),
        path.join(__dirname + '/../../', './tests/resources/Multifile/changed_loops/Student1/file2.js')]

        expect(filepath.getFilePaths(multiFilePath)).to.deep.equal(multiFiles)
    })

    it('Call getfilepath method to test for directory with single files ', () => {
        const singleFile: Array<string> = [path.join(__dirname + '/../../', './tests/resources/Singlefile/changed_loops/file1/file1.js')]
        expect(filepath.getFilePaths(singleFilePath)).to.deep.equal(singleFile)
    })
    it('Call getfilepath method to test for directory with empty files ', () => {
        expect(filepath.getFilePaths(emptyFilePath)).to.deep.equal([])
    })

    it('Call getfilepath method to test for directory with python files ', () => {
        expect(filepath.getFilePaths(pyPath)).to.deep.equal([])
    })
    it('Call getfilepath method to test for directory with python files and js files', () => {
        const pyandJSFiles: Array<string> = [path.join(__dirname + '/../../', './tests/resources/MultiLanguage/Submission2/file1.js'),
        path.join(__dirname + '/../../', './tests/resources/MultiLanguage/Submission2/file2.js')]
        expect(filepath.getFilePaths(pyAndJSPath)).to.deep.equal(pyandJSFiles)
    })
});


import { expect } from 'chai'

const _ = require("lodash");
import JSDetectorFactory from "../../src/DetectorFactory/JSDetectorFactory";
import PlagiarismRunner from "../../src/PlagiarismRunner/PlagiarismRunner";

let empty = './tests/resources/empty';
let singlechangeloopsStudent1 =
    './tests/resources/Singlefile/changed_loops/file1';
let singlechangeloopsStudent2 =
    './tests/resources/Singlefile/changed_loops/file2';
let singlederivedfilesStudent1 =
    './tests/resources/Singlefile/derived_files/file1';
let singlederivedfilesStudent2 =
    './tests/resources/Singlefile/derived_files/file2';
let singledifferentfilesStudent1 =
    './tests/resources/Singlefile/different_files/file1';
let singledifferentfilesStudent2 =
    './tests/resources/Singlefile/different_files/file2';
let singleextractedmethodsStudent1 =
    './tests/resources/Singlefile/extracted_methods/file1';
let singleextractedmethodsStudent2 =
    './tests/resources/Singlefile/extracted_methods/file2';
let singleidenticalStudent1 =
    './tests/resources/Singlefile/identical/file1';
let singleidenticalStudent2 =
    './tests/resources/Singlefile/identical/file2';
let singlemodifiedcommentsStudent1 =
    './tests/resources/Singlefile/modified_comments/file1';
let singlemodifiedcommentsStudent2 =
    './tests/resources/Singlefile/modified_comments/file2';
let singlemovedfunctionsStudent1 =
    './tests/resources/Singlefile/moved_functions/file1';
let singlemovedfunctionsStudent2 =
    './tests/resources/Singlefile/moved_functions/file2';
let singlerenamendattrStudent1 =
    "./tests/resources/Singlefile/renamed_attr/file1";
let singlerenamendattrStudent2 =
    "./tests/resources/Singlefile/renamed_attr/file2";

let emptyplage = new PlagiarismRunner(empty, empty);
let singleloopplage = new PlagiarismRunner(singlechangeloopsStudent1,
    singlechangeloopsStudent2);
let singlederivedplage = new PlagiarismRunner(singlederivedfilesStudent1,
    singlederivedfilesStudent2);
let singledifferentplage = new PlagiarismRunner
    (singledifferentfilesStudent1, singledifferentfilesStudent2);
let singliextractpplage = new PlagiarismRunner
    (singleextractedmethodsStudent1, singleextractedmethodsStudent2);
let singleidenticalplage = new PlagiarismRunner
    (singleidenticalStudent1, singleidenticalStudent2);
let singlecommentplage = new PlagiarismRunner
    (singlemodifiedcommentsStudent1, singlemodifiedcommentsStudent2);
let singlefunctionplage = new PlagiarismRunner
    (singlemovedfunctionsStudent1, singlemovedfunctionsStudent2);
let singlerenameattrplage = new PlagiarismRunner
    (singlerenamendattrStudent1, singlerenamendattrStudent2);

let plagiarismFactory = new JSDetectorFactory();

describe("Unit test for plagiarism runner for single files.", () => {
    it('plagiarism runner for empty file ', () => {
        expect(emptyplage.runPlagiarism.bind
            (emptyplage, plagiarismFactory)).to.throw("empty directory");
    })

    it('plagiarism runner for single loop change. ', () => {
        let result = singleloopplage.runPlagiarism(plagiarismFactory)
        expect(result.score).equal(32.20338983050847)
    })

    it('plagiarism runner for derived files. ', () => {
        let result = singlederivedplage.runPlagiarism(plagiarismFactory)
        expect(result.score).equals(50.847457627118644);
    })

    it('plagiarism runner for different plage. ', () => {
        let result = singledifferentplage.runPlagiarism(plagiarismFactory)
        expect(result.score).equals(1.694915254237288);
    })

    it('plagiarism runner for extract plage. ', () => {
        let result = singliextractpplage.runPlagiarism(plagiarismFactory)
        expect(result.score).equals(80.50847457627118);
    })

    it('plagiarism runner for modified comments. ', () => {
        let result = singlecommentplage.runPlagiarism(plagiarismFactory)
        expect(result.score).equals(100);
    })

    it('plagiarism runner for identical. ', () => {
        let result = singleidenticalplage.runPlagiarism(plagiarismFactory)
        expect(result.score).equals(100);
    })

    it('plagiarism runner for moved function. ', () => {
        let result = singlefunctionplage.runPlagiarism(plagiarismFactory)
        expect(result.score).equals(88.13559322033898);
    })

    it('plagiarism runner for single renamed attribute ', () => {
        let result = singlerenameattrplage.runPlagiarism(plagiarismFactory)
        expect(result.score).equals(100);
    })
});

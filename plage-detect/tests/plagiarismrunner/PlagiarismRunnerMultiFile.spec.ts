import { expect } from 'chai'

const _ = require("lodash");
import JSDetectorFactory from "../../src/DetectorFactory/JSDetectorFactory";
import PlagiarismRunner from "../../src/PlagiarismRunner/PlagiarismRunner";

let empty = './tests/resources/empty';
let mutltichangeloopsStudent1 = './tests/resources/Multifile/changed_loops/Student1';
let mutltichangeloopsStudent2 = './tests/resources/Multifile/changed_loops/Student2';
let mutltiderivedfilesStudent1 = './tests/resources/Multifile/derived_files/Student1';
let mutltiderivedfilesStudent2 = './tests/resources/Multifile/derived_files/Student2';
let mutltidifferentfilesStudent1 = './tests/resources/Multifile/different_projects/Student1';
let mutltidifferentNestStudent2 = './tests/resources/Multifile/different_projects_deep/Student2';
let mutltidifferentNestStudent1 = './tests/resources/Multifile/different_projects_deep/Student1';
let mutltidifferentfilesStudent2 = './tests/resources/Multifile/different_projects/Student2';
let mutltiextractedmethodsStudent1 = './tests/resources/Multifile/extracted_methods/Student1';
let mutltiextractedmethodsStudent2 = './tests/resources/Multifile/extracted_methods/Student2';
let mutltiidenticalStudent1 = './tests/resources/Multifile/identical/Student1';
let mutltiidenticalStudent2 = './tests/resources/Multifile/identical/Student2';
let mutltimodifiedcommentsStudent1 = './tests/resources/Multifile/identical/Student1';
let mutltimodifiedcommentsStudent2 = './tests/resources/Multifile/identical/Student2';
let mutltiemovedfunctionsStudent1 = './tests/resources/Multifile/moved_functions/Student1';
let mutltiemovedfunctionsStudent2 = './tests/resources/Multifile/moved_functions/Student2';
let mutltirenamendattrStudent1 = './tests/resources/Multifile/renamed_attributes/Student1';
let mutltirenamendattrStudent2 = './tests/resources/Multifile/renamed_attributes/Student2';

let emptyplage = new PlagiarismRunner(empty, empty);
let multiloopplage = new PlagiarismRunner(mutltichangeloopsStudent1, mutltichangeloopsStudent2);
let multiderivedplage = new PlagiarismRunner(mutltiderivedfilesStudent1, mutltiderivedfilesStudent2);
let multidifferentplage = new PlagiarismRunner(mutltidifferentfilesStudent1, mutltidifferentfilesStudent2);
let multidifferentplageNested = new PlagiarismRunner(mutltidifferentNestStudent1, mutltidifferentNestStudent2);
let multiextractplage = new PlagiarismRunner(mutltiextractedmethodsStudent1, mutltiextractedmethodsStudent2);
let multiidenticalplage = new PlagiarismRunner(mutltiidenticalStudent1, mutltiidenticalStudent2);
let multicommentplage = new PlagiarismRunner(mutltimodifiedcommentsStudent1, mutltimodifiedcommentsStudent2);
let multifunctionplage = new PlagiarismRunner(mutltiemovedfunctionsStudent1, mutltiemovedfunctionsStudent2);
let multirenameattrplage = new PlagiarismRunner(mutltirenamendattrStudent1, mutltirenamendattrStudent2);

let plagiarismFactory = new JSDetectorFactory();

describe("Unit test for plagiarism runner for multiple files.", () => {
    it('plagiarism runner for empty file ', () => {
        expect(emptyplage.runPlagiarism.bind(emptyplage,
            plagiarismFactory)).to.throw("empty directory");
    })

    it('plagiarism runner for multifile loop change. ', () => {
        let result = multiloopplage.runPlagiarism(plagiarismFactory);
        expect(result.score).equal(52.488687782805435)
    })

    it('plagiarism runner for derived files. ', () => {
        let result = multiderivedplage.runPlagiarism(plagiarismFactory);
        expect(result.score).equals(56.10859728506787);
    })

    it('plagiarism runner for different deeply nested plagiarism. ',
        () => {
            let result = multidifferentplageNested.runPlagiarism
                (plagiarismFactory);
            expect(result.score).equals(1.3651877133105803);
        });

    it('plagiarism runner for extract plage. ', () => {
        let result = multiextractplage.runPlagiarism(plagiarismFactory)
        expect(result.score).equals(80.99547511312217);
    });

    it('plagiarism runner for modified comments. ', () => {
        let result = multicommentplage.runPlagiarism(plagiarismFactory)
        expect(result.score).equals(100);
    })

    it('plagiarism runner for identical. ', () => {
        let result = multiidenticalplage.runPlagiarism(plagiarismFactory)
        expect(result.score).equals(100);
    })

    it('plagiarism runner for moved function. ', () => {
        let result = multifunctionplage.runPlagiarism(plagiarismFactory)
        expect(result.score).equals(95.92760180995475);
    })

    it('plagiarism runner for single renamed attribute ', () => {
        let result = multirenameattrplage.runPlagiarism(plagiarismFactory)
        expect(result.score).equals(100);
    })
});

import { Color } from "./Color";
import { IDetector } from "./IDetector";
import { IParser } from "./IParser";

export class Detector implements IDetector {
    private similarity: number;
    private plagiarizedTextColor: Color;
    private isPlagiarized: boolean;

    constructor(plagiarizedTextColor: Color) {
        this.plagiarizedTextColor = plagiarizedTextColor;
        this.similarity = 0;
        this.isPlagiarized = false;
    }

    getSimilarityPercentage(): number { return; }

    // should this be in detector system as it takes care
    // of displaying the result?
    getPlagiarizedTextColor(): Color { return; }

    getIsPlagiarized(): boolean { return false; }

    // i think this method should be in detector system so as to
    // maintain the belongs to relationship
    runPlagiarismAlgorithm(parser1: IParser, parser2: IParser):
        string { return; }
}

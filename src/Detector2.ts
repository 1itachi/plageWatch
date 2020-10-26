import { Color } from "./Color";
import { IDetector } from "./IDetector";
import { IParser } from "./IParser";

export class Detector implements IDetector {
    private plagiarizedTextColor: Color;
    private isPlagiarized: boolean;
    private similarity: number;

    constructor(plagiarizedTextColor: Color) {
        this.plagiarizedTextColor = plagiarizedTextColor;
        this.similarity = 0;
        this.isPlagiarized = false;
    }

    getSimilarityPercentage(): number { return; }

    runPlagiarismAlgorithm(parser1: IParser, parser2: IParser):
        string { return; }

    getPlagiarizedTextColor(): Color { return; }

    getIsPlagiarized(): boolean { return false; }
}

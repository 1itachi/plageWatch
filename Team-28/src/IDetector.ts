import { Color } from "./Color";
import { IParser } from "./IParser";

export interface IDetector {
    getSimilarityPercentage(): number;
    getPlagiarizedTextColor(): Color;
    getIsPlagiarized(): boolean;
    runPlagiarismAlgorithm(parser1: IParser, parser2: IParser): string;
}

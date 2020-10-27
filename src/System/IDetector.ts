import { Color } from "../Enums/Color";
import { IParser } from "./IParser";

export interface IDetector {
    getSimilarityPercentage(): number;
    runPlagiarismAlgorithm(parser1: IParser, parser2: IParser): string;
    getPlagiarizedTextColor(): Color;
    getIsPlagiarized(): boolean;
}

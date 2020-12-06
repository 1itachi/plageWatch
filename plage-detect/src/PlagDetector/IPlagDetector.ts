import { PlagResult } from "../Types/PlagResultType";

interface IPlagDetector {
   detect(): PlagResult;
}

export default IPlagDetector;
import { PlagResult } from "../Types/PlagResultType";

/**
 * Interface for plagiearism detector. 
 * Provides detect method which detects plagiarism fro two submissions.
 */
interface IPlagDetector {
   detect(): PlagResult;
}

export default IPlagDetector;
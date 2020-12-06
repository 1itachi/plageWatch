import { SubmissionCode, SubmissionMap } from "../Types/PlagResultType"
import * as babel from "@babel/core"
/**
 * Provides methods to generate AST nodes.
 */
interface IASTGenerator {
  generateASTs(): Array<babel.Node>
  getFileContents(): SubmissionCode
  getFileMaps(): SubmissionMap
}

export default IASTGenerator

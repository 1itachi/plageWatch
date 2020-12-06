/**
 * Extracts zip files to given directory path.
 */
interface IExtractor {
    extract(sourcepath: string, destinationPath: string):Promise<void>;
}

export default IExtractor;
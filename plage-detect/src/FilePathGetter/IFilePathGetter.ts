/**
 * Interface for file path getter. 
 * Provides a method to fetche all files in all nested directories.
 */
interface IFilePathGetter {
    getFilePaths(directoryPath: string): Array<string>;
}

export default IFilePathGetter;
/**
 * Interface for file path getter. Takes in a directory and fetches all files in all nested directories.
 */
interface IFilePathGetter {
    getFilePaths(directoryPath: string): Array<string>;
}

export default IFilePathGetter;
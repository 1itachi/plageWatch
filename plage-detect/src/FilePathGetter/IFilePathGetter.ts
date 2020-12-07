interface IFilePathGetter {
    getFilePaths(directoryPath: string): Array<string>;
}

export default IFilePathGetter;
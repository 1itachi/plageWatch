interface IASTGenerator {
    generateASTs(): Array<any>;
    getFileContents(): any;
    getFileMaps(): any;
}

export default IASTGenerator;
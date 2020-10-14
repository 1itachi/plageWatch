// Classes and interfaces based on the UML For Project
// Phase B of plagiarism detector.

enum Color {
    RED,
    GREEN
}

class Detector implements IDetector {
    public parser: Parser;
    // change to enum in design.
    public plagiarizedTextColor: Color;
    public plagiarized;
    constructor(parser: Parser,
        plagiarizedTextColor: Color,
        plagiarized: boolean) {
        this.parser = parser;
        this.plagiarizedTextColor = plagiarizedTextColor;
        this.plagiarized = plagiarized;
    }
    getSimilarityPercentage(report: string): number { return 0 };
    runPlagiarismAlgorithm(parser1: Parser, parser2: Parser):
        string { return };
}

class DetectorSystem {
    constructor() {

    }
    reportPlagiarism(): void { };
    detectPlagiarism(): void { };
    downloadReport(): void { };
    sendEmail(): void { };
    uploadFolder(folder: Folder) { };
}

class Parser implements IParser {
    public folder: Folder;
    public folderData: string;
    constructor(folder: Folder, folderData: string) {
        this.folder = folder;
        this.folderData = folderData;
    }
    parse(folderData: string): string { return };
}

class Folder implements IFolder {
    private folderTitle: string;
    private totalNumberOFiles: number;
    private fileData: string;
    constructor(folderTitle: string, totalNumberOfFiles: number,
        fileData: string) {
        this.folderTitle = folderTitle;
        this.totalNumberOFiles = totalNumberOfFiles;
        this.fileData = fileData;
    }
    getFileData(): string { return };
    getNumberOfFiles(): number { return 0 };
}

class User implements IUser {
    username: string;
    password: string;
    userId: number;
    constructor(username: string, password: string, userId: number) {
        this.username = username;
        this.password = password;
        this.userId = userId;
    }
    getUsername(): string { return };
    getPassword(): string { return };
    getUserId(): number { return 0 };
}

class Account {
    constructor() {

    }
    register(user: User): void { }
    login(user: User): void { }
    logout(user: User): void { }
}

class Instructor {
    email: String;
    constructor(email: String) {
        this.email = email;
    }
    getInstructor(): User { return };
}

// interfaces defined here.
interface IDetector {
    getSimilarityPercentage(report: string): number;
    runPlagiarismAlgorithm(parser1: Parser, parser2: Parser): string;
}

interface IParser {
    parse(folderData: string): string;
}

interface IFolder {
    getFileData(): string;
    getNumberOfFiles(): number;
}

interface IUser {
    getUsername(): string;
    getPassword(): string;
    getUserId(): number;
}

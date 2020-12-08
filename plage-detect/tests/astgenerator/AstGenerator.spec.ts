import { expect } from 'chai'
import * as babel from "@babel/core"
import * as path from "path";
import * as fs from "fs";
import ASTGenerator from "../../src/ASTGenerator/ASTGenerator";

// file paths to generate the AST.

let fileSingleFile: string[] = [path.join(__dirname + '/../../', './tests/resources/Submission1/Student1/sample/file1.js')];
let fileEmpty: string[] = [path.join(__dirname + '/../../', './tests/resources/Submission2/emptyJSFile/empty.js')];
let fileMultiple: string[] = [path.join(__dirname + '/../../', './tests/resources/Submission2/emptyJSFile/empty.js'), path.join(__dirname + '/../../', './tests/resources/Submission1/Student1/sample/file1.js'), path.join(__dirname + '/../../', './tests/resources/Submission1/Student1/sample/file2.js')];

let generatorSingleFile = new ASTGenerator(fileSingleFile);
let generatorEmptyFile = new ASTGenerator(fileEmpty);
let generatorMuliFile = new ASTGenerator(fileMultiple);

describe("Unit test for Ast Generator", () => {

    it('Call getFileContents before calling generateASTs ', () => {
        expect(generatorSingleFile.getFileContents()).to.include({});

    });

    it('Call getFileMaps before calling generateASTs', () => {
        expect(generatorSingleFile.getFileContents()).to.include({});
    });

    it('Call generateASTs with correct file path', () => {
        let nodes: Array<babel.Node> = []
        fileSingleFile.forEach((path: string) => {
            nodes.push(babel.transformFileSync(path, { ast: true }).ast)
        })
        expect(generatorSingleFile.generateASTs()).to.deep.equals(nodes);
    });


    it('Call getFileContents after calling generateASTs function', () => {
        generatorSingleFile.generateASTs()
        let mapFileToContent = {}
        fileSingleFile.forEach((path: string) => {
            let newPath: string = path.split(/Submission\d{1}[/\\]{1,2}/)[1]
            mapFileToContent[newPath] = fs.readFileSync(path, "utf-8")
        })


        expect(generatorSingleFile.getFileContents()).to.deep.equal(mapFileToContent);
    });

    it('Call getFileMaps after calling generateASTs function', () => {
        generatorSingleFile.generateASTs()
        let fileMap = {}
        let counter: number = 0
        fileSingleFile.forEach((path: string) => {
            let newPath: string = path.split(/Submission\d{1}[/\\]{1,2}/)[1]
            fileMap[counter] = newPath
            counter = counter + 1
        })
        expect(generatorSingleFile.getFileMaps()).to.deep.equal(fileMap);
    });

    it('Call generateASTs on an Empty file', () => {
        let nodes: Array<babel.Node> = []
        fileEmpty.forEach((path: string) => {
            nodes.push(babel.transformFileSync(path, { ast: true }).ast)
        })
        expect(generatorEmptyFile.generateASTs()).to.deep.equals(nodes);
    });

    it('Call getFileContents after calling generateASTs function on an empty file', () => {
        generatorEmptyFile.generateASTs()
        let mapFileToContent = {}
        fileEmpty.forEach((path: string) => {
            let newPath: string = path.split(/Submission\d{1}[/\\]{1,2}/)[1]
            mapFileToContent[newPath] = fs.readFileSync(path, "utf-8")
        })
        expect(generatorEmptyFile.getFileContents()).to.deep.equal(mapFileToContent);
    });

    it('Call getFileMaps after calling generateASTs function on an empty file', () => {
        generatorEmptyFile.generateASTs()
        let fileMap = {}
        let counter: number = 0
        fileEmpty.forEach((path: string) => {
            let newPath: string = path.split(/Submission\d{1}[/\\]{1,2}/)[1]
            fileMap[counter] = newPath
            counter = counter + 1
        })
        expect(generatorEmptyFile.getFileMaps()).to.deep.equal(fileMap);
    });

    it('Call generateASTs on Multiple files', () => {
        let nodes: Array<babel.Node> = []
        fileMultiple.forEach((path: string) => {
            nodes.push(babel.transformFileSync(path, { ast: true }).ast)
        })
        expect(generatorMuliFile.generateASTs()).to.deep.equals(nodes);
    });

    it('Call getFileContents after calling generateASTs function on multiple file', () => {
        generatorMuliFile.generateASTs()
        let mapFileToContent = {}
        fileMultiple.forEach((path: string) => {
            let newPath: string = path.split(/Submission\d{1}[/\\]{1,2}/)[1]
            mapFileToContent[newPath] = fs.readFileSync(path, "utf-8")
        })
        expect(generatorMuliFile.getFileContents()).to.deep.equal(mapFileToContent);
    });

    it('Call getFileMaps after calling generateASTs function on multiple file', () => {
        generatorMuliFile.generateASTs()
        let fileMap = {}
        let counter: number = 0
        fileMultiple.forEach((path: string) => {
            fileMap[counter] = path.split(/Submission\d{1}[/\\]{1,2}/)[1]
            counter = counter + 1
        })
        expect(generatorMuliFile.getFileMaps()).to.deep.equal(fileMap);
    });
});

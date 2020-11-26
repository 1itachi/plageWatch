import React from "react";
import './UploadPage.css'
import Drop from './DropZone';
import Results from './../../components/results/Results';
import NavBar from './../navigation/Navigation';
import { Button } from "react-bootstrap";

const uploaded: boolean = true;
const notUploaded: boolean = false;
const displayResults: boolean = true;
const notDisplayResults: boolean = false;


interface UploadState {
    file1Uploaded: boolean,
    file2Uploaded: boolean,
    checkedPlagiarism: boolean,
    checkedResults: boolean,
    displayed: boolean
}

export default class Upload extends React.Component
    <{}, UploadState> {

    constructor(props: any) {
        super(props);
        this.state = {
            file1Uploaded: notUploaded,
            file2Uploaded: notUploaded,
            displayed: notUploaded,
            checkedPlagiarism: false,
            checkedResults: false
        }

        this.uploadFile1 = this.uploadFile1.bind(this);
        this.uploadFile2 = this.uploadFile2.bind(this);
        this.runPlagiarism = this.runPlagiarism.bind(this);
        this.displayResultFunction = this.displayResultFunction.bind(this);
    }

    /* Check for plagiarism, disable until the upload is completed. */
    componentDidUpdate(prevState: any) {
        if (this.state.checkedPlagiarism !== true) {
            const { file1Uploaded, file2Uploaded } = this.state;
            if (file1Uploaded === uploaded && file2Uploaded === uploaded) {
                this.setState({ checkedPlagiarism: true });
                this.setState({ checkedResults: true });
            }
        }
    }

    uploadFile1() {
        const { file1Uploaded } = this.state;
        this.setState({ file1Uploaded: !file1Uploaded });
    }

    uploadFile2() {
        const { file2Uploaded } = this.state;
        this.setState({ file2Uploaded: !file2Uploaded });
    }

    runPlagiarism() {
        if (this.uploadFile1 && this.uploadFile2) {
            this.setState({
                checkedPlagiarism: uploaded,
                checkedResults: uploaded
            });
        } else {
            this.setState({
                checkedPlagiarism: !uploaded,
                checkedResults: !uploaded
            });
        }
    }

    displayResultFunction() {
        const { displayed } = this.state;
        this.setState({ displayed: !displayed })
    }

    render() {
        // @ts-ignore
        return (
            <div className="mt-4">
                <h1 className="center upload-text">Upload Folders To
                Detect For Plagiarism!!</h1>
                <h3 className="center directions">
                    Please upload two submissions to run plagiarism.
                    Supported formats for file transfer: .js
                </h3>
                <div className="container-fluid center row flex">

                    {/* File 1 upload here. */}
                    <div className="col-sm-6  mt-4 center sub-style">
                        <Drop onChange={this.uploadFile1} />
                    </div>

                    {/* File 2 upload here. */}
                    <div className="col-sm-6 mt-4 center sub-style">
                        <Drop onChange={this.uploadFile2} />
                    </div>

                    <div className="col-sm-12 mt-4 center">

                        <br></br>

                        <div className="col center">
                            <Button disabled={!this.state.checkedPlagiarism}
                                className="btn border rounded check-button text-light p-2" >
                                <i className="fas fa-search"> </i>
                                Check Plagiarism </Button>
                        </div>
                    </div>

                    <Results></Results>

                    <div className="col-sm-12 mt-4 center">
                        <br></br>
                        <div className="col center">
                            <Button disabled={true}
                                className="btn border rounded check-button text-light p-2">
                                <i className="fas fa-search"> </i>
                                <a href="/codecomparsion">Compare</a> </Button>
                        </div>
                    </div>
                    {/* Hide results until the plagiarism button
                    is clicked. */}
                    {/* <Results disabled={!this.state.checkedPlagiarism} /> */}
                    {/*
                    {this.onClick && !this.runPlagiarism &&
                        enabled &&
                        <Results />}
                    */}
                    <br></br>
                </div>
                {/* Compare button to go to side by side compare page.
                    */}
                <br></br>
            </div>
        );
    }
}

// Source for progress bar:
// https://www.w3schools.com/tags/tag_meter.asp

import React from "react";
import './UploadPage.css'
import Drop from './DropZone';
import Results from './../../components/results/Results';
import ShowResults from './../../components/results/ShowResults';
import CircularProgressBar from './../../components/results/CircularProgressBar';
import { Button } from "react-bootstrap";
import { ProgressBar } from 'react-onsenui';

const uploaded: boolean = true;
const notUploaded: boolean = false;

interface UploadState {
    file1Uploaded: boolean,
    file2Uploaded: boolean,

    displayResult: boolean,
    displayProgress: boolean,
    enableRunButton: boolean
}

export default class Upload extends React.Component
    <{}, UploadState> {

    constructor(props: any) {
        super(props);
        this.state = {
            file1Uploaded: notUploaded,
            file2Uploaded: notUploaded,
            displayResult: false,
            enableRunButton: false,
            displayProgress: false
        }

        // this.uploadFile1 = this.uploadFile1.bind(this);
        // this.uploadFile2 = this.uploadFile2.bind(this);
        // this.runPlagiarism = this.runPlagiarism.bind(this);
        // this.displayResultFunction = this.displayResultFunction.bind(this);
    }

    /* Check for plagiarism, disable until the upload is completed. */
    componentDidUpdate() {
        if (this.state.enableRunButton !== true) {
            const { file1Uploaded, file2Uploaded } = this.state;
            if (file1Uploaded === uploaded && file2Uploaded === uploaded) {
                this.setState({ enableRunButton: true });
                // this.setState({ checkedResults: true });
            }
        }
    }

    uploadFile1() {
        // const { file1Uploaded } = this.state;
        this.setState({ file1Uploaded: true });
    }

    uploadFile2() {
        // const { file2Uploaded } = this.state;
        this.setState({ file2Uploaded: true });
    }

    // runPlagiarism() {
    //     if (this.uploadFile1 && this.uploadFile2) {
    //         this.setState({
    //             checkedPlagiarism: uploaded,
    //             checkedResults: uploaded
    //         });
    //     } else {
    //         this.setState({
    //             checkedPlagiarism: !uploaded,
    //             checkedResults: !uploaded
    //         });
    //     }
    // }

    // displayResultFunction() {
    //     this.setState({
    //         display: uploaded
    //     })
    // }

    displayProgressBar() {
        this.setState((prevState) => ({
            displayProgress: !prevState.displayProgress
        }))
    }

    runPlagiarism() {
        //dispaly progress bar
        this.displayProgressBar()
        //api call to backend

        this.setState({
            displayResult: true
        })

        //hide progress bar
        this.displayProgressBar()
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
                            <Button disabled={!this.state.enableRunButton}
                                className="btn border rounded check-button text-light p-2"
                                onClick={this.runPlagiarism}>
                                <i className="fas fa-search"> </i>
                                Check Plagiarism </Button>

                            <br></br>
                        </div>
                    </div>

                    {/* How to transition between progress bar and
                    results here? */}
                    {this.state.displayProgress && <CircularProgressBar />}

                    {/* <div className="progress-bar center">
                        <br></br>
                        <hr></hr>
                        {!ShowResults &&
                       }
                        {!ShowResults && this.runPlagiarism &&
                            }
                    </div> */}
                    {this.state.displayResult &&
                        <div className="col-sm-12 mt-4 center">
                            <Results />
                            <br></br>
                            <div className="col center">
                                <Button className="btn border rounded check-button text-light p-2">
                                    <i className="fas fa-search"> </i>
                                    <a href="http://localhost:3000/codecomparison">Compare</a> </Button>
                            </div>
                        </div>}
                </div>
            </div>
        );
    }
}

import React from "react";
import './UploadPage.css'
import Dropzone from 'react-dropzone';
import Drop from './DropZone';

export default class Upload extends React.Component {

    state = {
        file1: '',
        file2: '',
        diabled: true
    }


    runPlagiarism() {
        console.log("hi");
    }



    render() {
        return (
            <div className="mt-4">
                <h1 className="center upload-text">Upload Folders To
                Detect For Plagiarism!!</h1>
                <h3 className="center directions">
                    Please upload all student submissions to transfer
                    to the PlageWatch system for similarity analysis.
                    Supported formats for file transfer includes:
                    .js
                </h3>
                <div className="container-fluid  row flex">
                    <div className="col-sm-6  mt-4 center sub-style">
                        <Drop />

                    </div>

                    <div className="col-sm-6 mt-4 center sub-style">
                        <Drop />
                    </div>
                    <div className="col-sm-12 mt-4 center">

                        <div className="btn border rounded cancel-button text-light p-2" onClick={this.runPlagiarism}>
                            <i className="fas fa-times"> </i>
                            <span> Cancel</span>
                        </div>

                        <br></br>

                        <div className="btn border rounded check-button text-light p-2" onClick={this.runPlagiarism}>
                            <i className="fas fa-search"> </i>
                            <span> Check Plagiarism</span>
                        </div>


                    </div>
                    {/* <button type="button" className="btn btn-primary">Run Plagiarism</button> */}

                </div>
            </div>
        );
    }
}

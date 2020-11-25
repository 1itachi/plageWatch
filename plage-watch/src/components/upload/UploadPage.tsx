import React from "react";
import './UploadPage.css'
import Dropzone from 'react-dropzone';
import Drop from './DropZone';

export default class Upload extends React.Component {

    state = {
        file1: '',
        file2: '',
        disabled: true
    }


    /* Check for plagiarism, disable until the upload is completed. */
    runPlagiarism() {

        console.log("hi");
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
                <div className="container-fluid  row flex">
                    <div className="col-sm-6  mt-4 center sub-style">
                        <Drop />

                    </div>

                    <div className="col-sm-6 mt-4 center sub-style">
                        <Drop />
                    </div>
                    <div className="col-sm-12 mt-4 center">

                        <br></br>

                        <div className="btn border rounded check-button text-light p-2" onClick={this.runPlagiarism}>
                            <button className={"primary"}>
                                <i className="fas fa-search"> </i>
                                Check Plagiarism</button>
                        </div>


                    </div>
                    {/* <button type="button" className="btn btn-primary">Run Plagiarism</button> */}

                </div>
            </div>
        );
    }
}

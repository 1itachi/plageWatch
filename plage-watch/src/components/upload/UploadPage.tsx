import React from "react";
import './UploadPage.css'
import Dropzone from 'react-dropzone';
import Drop from './DropZone';

{/* For this page (Deepak's Instructions):

1) Maintain a state for file upload 1.
2) Maintain a state for file upload 2.
3) Maintain a state for button active.
4) Change state of button only if the other two
states are true. */}

export default class Upload extends React.Component {

    /** Make separate states for each file upload and button. */
    file1State = {
        file1: '',
        disabled: true
    }

    file2State = {
        file1: '',
        disabled: true
    }

    fileButtonState = {
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

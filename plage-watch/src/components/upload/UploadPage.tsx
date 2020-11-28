import React from "react";
import './UploadPage.css'
import Drop from './DropZone';
import Results from './../../components/results/Results';
import { Button } from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import { PieChart } from 'react-minimal-pie-chart';
import runPlag from './../../services/upload';

const uploaded: boolean = true;
const notUploaded: boolean = false;

const defaultLabelStyle = {
    fontSize: '30%',
    fontFamily: 'cursive'
  };

interface UploadState {
    file1Uploaded: boolean;
    file2Uploaded: boolean;

    displayResult: boolean;
    displayProgress: boolean;
    enableRunButton: boolean;
    submission1Files: any;
    submission2Files: any;
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
            displayProgress: false,
            submission1Files: [],
            submission2Files: [],
        }

        this.uploadFile1 = this.uploadFile1.bind(this);
        this.uploadFile2 = this.uploadFile2.bind(this);
        this.runPlagiarism = this.runPlagiarism.bind(this);
    }

    /* Check for plagiarism, disable until the upload is completed. */
    componentDidUpdate(prevState:any) {
        if (this.state.enableRunButton !== true) {
            const { file1Uploaded, file2Uploaded } = this.state;
            if (file1Uploaded === uploaded && file2Uploaded === uploaded) {
                this.setState({ enableRunButton: true });
                // this.setState({ checkedResults: true });
            }
        }
    }

    uploadFile1(submissionFile: any) {
        this.setState({ file1Uploaded: true });
        this.setState({ submission1Files: submissionFile});
    }

    uploadFile2(submissionFile: any) {
        this.setState({ file2Uploaded: true });
        this.setState({ submission2Files: submissionFile});
    }

    async runPlagiarism () {
        //dispaly progress bar
        await this.setState({
            displayProgress : true
         })
    
         //api call to backend
        //  console.log([this.state.submission1Files, this.state.submission2Files])
        // const results:any = 
        await runPlag([this.state.submission1Files, this.state.submission2Files])


        await this.setState({
            displayResult: true
        })
        
        const result:any = document.getElementById('result')
        result.scrollIntoView({ behavior: 'smooth' })

        //hide progress bar
        await this.setState({
            displayProgress : false
         })


    }

    data:any =[
        { title: 'Plagiarised', value:70, color: '#C13C37'},
        { title: 'Not Plagiarised', value: 30, color: '#02A938' },
        ]

     

    render() {
        return (
            <div className="m-4">
                <h1 className="center upload-text">Upload Folders To
                Detect For Plagiarism!!</h1>
                <h3 className="m-4 center directions">
                    Please upload two submissions to run plagiarism.
                    Supported formats for file transfer: .js
                </h3>
                <div className="container-fluid mx-auto">

                    <div className=" mt-4 center sub-style">
                        <Drop onChange={this.uploadFile1} submission={this.state.submission1Files}/>
                    </div>

                    <div className="mt-4 center sub-style">
                        <Drop onChange={this.uploadFile2} submission={this.state.submission2Files}/>
                    </div>

                        <div className="col-sm mt-4 center">
                            <Button disabled={!this.state.enableRunButton}
                                className="btn border rounded check-button text-light p-2"
                                onClick={this.runPlagiarism}>
                              <i className="fas fa-search"><span style={{fontFamily:"cursive"}}>Check Plagiarism  </span></i>
                             </Button>  
                        </div>

                       
                        {/* {this.state.displayProgress &&
                         <div className= "mx-auto mt-3 center">
                          <CircularProgressBar />
                         </div>
                        } */}
                        
                    {this.state.displayResult &&
                        <div id="result" className="mt-2 p-4 center row">
                            <div className="mt-4 center sub-style">
                            <Results score={16}/>
                            </div>

                            <div className="mt-4 center sub-style">
                                <LinkContainer to="/codecomparison">
                                <Button className="btn border rounded check-button text-light p-2">
                                <i className="far fa-file-code"> <span style={{fontFamily:"cursive"}}>Compare</span></i>                              
                                   </Button>
                                   </LinkContainer>
                            </div>

                            {/* <Row style={{width:'40%', height:"40%", padding:"0%"}}> */}
                            <div className="mt-4 sub-style">
                        <PieChart
                           animate
                           animationDuration={500}
                           animationEasing="ease-out"
                            data = {this.data}
                            label={({ dataEntry }) => {    
                                if(dataEntry.value === 0){
                                   return dataEntry.title = ""
                                }
                            return dataEntry.title +':' + dataEntry.value + "%"
                            }}
                            labelStyle={{
                                ...defaultLabelStyle,
                              }}
                            radius = {50}
                        />
                        {/* </Row> */}
                        </div>
                        </div>}

                </div>
            </div>
        );
    }
}

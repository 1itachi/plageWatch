import React from "react";
import './UploadPage.css'
import Dropzone from 'react-dropzone';
import Drop from './DropZone';

export default class Upload extends React.Component {
    
    state = {
        file1 : '',
        file2 : '',
        diabled: true
    }


    runPlagiarism () {
        console.log("hi");
    }



    render() {
        return(
              <div className="mt-4">
                  <h1 className="center  upload-text">Upload Folders To Run Plagiarism!!</h1>
                 <div className= "container-fluid  row flex">
                     <div className="col-sm-6  mt-4 center sub-style">      
                         <Drop/>
                
                     </div>

                     <div className="col-sm-6 mt-4 center sub-style">
                         <Drop/>
                     </div>
                    <div className="col-sm-12 mt-4 center">

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

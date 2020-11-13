import React from "react";
import './UploadPage.css'


export default class Upload extends React.Component {
    render() {
        return(
              <div>
                  <h1 className="center upload-text">Upload Folders To Run Plagiarism!!</h1>
                 <div className= "">
                     <div className="row mt-4">
                     <div className="col-sm-6 center">
                    <input className="" type="file" accept=".zip"></input>
                    </div>
                    <div className="col-sm-6 center">
                    <input className="center" type="file" accept=".zip"></input>
                    </div>
                     </div> 
                    <button type="button" className="btn btn-primary center">Run Plagiarism</button>
                 </div>
              </div>        
        );
      }
}

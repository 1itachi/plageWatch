import React from "react";
import './Results.css'

export default function  Results (props:any) {

        let color:string
        if(props.score > 50){
            color = '#C13C37'
        }else{
            color = '#02A938'
        }


        return (
            <div className="results mt-4 container-wide">
                <div className="container">
                    <div className="container-main">
                        <h1 className="upload-text">Plagiarism Detection
                        Results: </h1>
                    </div>
                    <div style={{background:color}}>
                        <div className="center col">
                            <h2><strong>Similarity Percentage:
                                &nbsp; {props.score} %</strong></h2>
                        </div>
                    </div>
                </div>
            </div>
        );
}

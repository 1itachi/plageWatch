import React, { ReactElement } from "react";
import './Results.css'

type PlageResultProps = {
    score: number;
}
type Color = string;
export default function Results(props: PlageResultProps): ReactElement {

    let color: Color;
    if (props.score > 50) {
        color = '#C13C37'
    } else {
        color = '#02A938'
    }


    return (
        <div className="results mt-4 container-wide">
            <div className="container">
                <div className="container-main">
                    <h1 className="upload-text">Plagiarism Detection Results: </h1>
                </div>
                <div style={{ background: color, color: 'white' }}>
                    <div className="center">
                        <h2><strong>Submission 1 is {props.score}% similar to Submission 2</strong></h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

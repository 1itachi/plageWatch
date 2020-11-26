import React from "react";
import './Results.css'

const disabled: boolean = false;
const enabled: boolean = true;
// make this dynamic with respect to plagiarism findings.
let plagiarismValue: number = 0.0;

interface ResultsState {
    checkedPlagiarism: boolean;
    plagiarismValue: number;
}

export default class Results extends React.Component
    <{}, ResultsState> {

    constructor(props: any) {
        super(props);
        this.state = {
            checkedPlagiarism: false,
            plagiarismValue: 0.0
        }
        this.checkPlagiarism = this.checkPlagiarism.bind(this);
    }

    checkPlagiarism() {
        const { checkedPlagiarism, plagiarismValue } = this.state;
        if (plagiarismValue > 70.0 && checkedPlagiarism == true) {
            this.setState({ checkedPlagiarism: enabled });
        } else {
            this.setState({ checkedPlagiarism: disabled });
        }
    }

    render() {
        return (
            <div className="mt-4 container-wide">
                <div className="container">

                    {/* Hardcoded for now. */}

                    {/* Display the findings here:  */}
                    <div className="container-main">
                        <h1 className={"nav-text-style"}>Plagiarism Finding Results: </h1>
                    </div>

                    {/** Similarity of plagiarism here, change colors
                     * based on the severity of the plagiarism. */}

                    <div className="center similarity row">
                        <div className="center similarity col">
                            <h2><strong>Similarity %: {plagiarismValue}</strong></h2>
                        </div>
                    </div>

                    <br></br>

                    <div className="row">
                        <div className="col-6">
                            <div className="center student1">
                                <h4>Student 1</h4></div>
                            <br></br>
                            <div className="h3-title"><h2>Plagiarism occurred at:</h2>
                                <h3>File: src/test1/Sample2Copy.js</h3>
                                <p>(Sample2Copy.fibonacci(): line 3)</p>
                                <p>(Sample2Copy.fibonacci(): line 4)</p>
                                <p>(Sample2Copy.fibonacci(): line 5)</p>
                                <hr></hr>
                                <h3>File: src/test1/Sample1.js</h3>
                                <p>(Sample1.binarySearch(): line 3)</p>
                                <p>(Sample1.binarySearch(): line 4)</p>
                                <p>(Sample1.binarySearch(): line 5)</p>
                            </div>
                        </div>

                        <div className="col-6">
                            <div className="center student2">
                                <h4>Student 2</h4></div>
                            <br></br>
                            <div className="h3-title"><h2>Plagiarism occurred at:</h2>
                                <h3>File: src/test2/Sample3.js</h3>
                                <p>(Sample3.fibonacci(): line 12)</p>
                                <p>(Sample3.fibonacci(): line 13)</p>
                                <hr></hr>
                                <h3>File: src/test2/Sample4.js</h3>
                                <p>(Sample4.BinarySearch(): line 13)</p>
                                <p>(Sample4.BinarySearch(): line 14)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

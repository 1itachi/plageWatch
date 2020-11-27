import React from "react";
import './Results.css'

const disabled: boolean = false;
const enabled: boolean = true;
// make this dynamic with respect to plagiarism findings.
let plagiarismValue: number = 70.0;

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
                        <h1 className={"nav-text-style"}>Plagiarism Detection
                        Results: </h1>
                    </div>

                    {/** Similarity of plagiarism here, change colors
                     * based on the severity of the plagiarism. */}

                    <div className="center similarity row">
                        <div className="center similarity col">
                            <h2><strong>Similarity Percentage:
                                {plagiarismValue} %</strong></h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

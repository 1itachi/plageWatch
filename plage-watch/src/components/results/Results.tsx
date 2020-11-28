import React from "react";
import './Results.css'
import { green, red } from "@material-ui/core/colors";

const disabled: boolean = false;
const enabled: boolean = true;
// make this dynamic with respect to plagiarism findings.
let plagiarismValue: number = Math.floor(Math.random() * 100) + 1;
let plagiarismColor: Object = green;
let isSimilarity: boolean = true;

// change the color based on similarity value

interface ResultsState {
    checkedPlagiarism: boolean;
    plagiarismValue: number;
    plagarismColor: Object;
}

export default class Results extends React.Component
    <{}, ResultsState> {

    constructor(props: any) {
        super(props);
        this.state = {
            checkedPlagiarism: false,
            plagiarismValue: 0.0,
            plagarismColor: green
        }
        this.checkPlagiarism = this.checkPlagiarism.bind(this);
    }

    checkPlagiarism() {
        const { checkedPlagiarism, plagiarismValue } = this.state;
        if (plagiarismValue > 70 && checkedPlagiarism === true) {
            this.setState({ plagarismColor: red });
            this.setState({ checkedPlagiarism: enabled });
        } else {
            this.setState({ plagarismColor: green });
            this.setState({ checkedPlagiarism: disabled });
        }
    }

    render() {
        return (
            <div className="results mt-4 container-wide">
                <div className="container">
                    {/* Display the findings here:  */}
                    <div className="container-main">
                        <h1 className={"nav-text-style"}>Plagiarism Detection
                        Results: </h1>
                    </div>

                    {/** Similarity of plagiarism here, change colors
                     * based on the severity of the plagiarism. */}

                    <div className={isSimilarity ? 'similarity-good' : 'similarity-bad'}>
                        <div className="center similarity-good col">
                            <h2><strong>Similarity Percentage:
                                &nbsp; {plagiarismValue} %</strong></h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

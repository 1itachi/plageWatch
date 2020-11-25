import React from "react";
import './Results.css'
import detect from './../../images/plagewatch.jpg'

export default class Results extends React.Component {
    render() {
        return (

            <div className="col row center">

                {/* Display the findings here:  */}
                <div className="container-main">
                    <h1 className={"nav-text-style"}>Plagiarism Finding Results: </h1>
                </div>

                <div className="container col-sm-6 row center">
                    {/*
                     Plagiarism (%):
                    {
                    '1': {
                    './src/test1/Sample2Copy.js': [ 3, 4, 5 ],
                    './src/test2/Sample3.js': [ 3, 4, 5 ]
                    },
                    '2': {
                    './src/test1/fib1.js': [ 12, 13 ],
                    './src/test2/fib2.js': [ 13, 14 ]
                    },
                    score: 25
                    */}

                    {/* Hardcoded for now. */}
                    <div className="row">
                        <div className="col-6">
                            <button className="primary">Student 1</button>
                            <h1 className="h1">Plagiarism Detected!
                                <br />
                                <h2>File: src/test1/Sample2Copy.js</h2>
                                <em><h3>Line 3</h3></em>
                                <em><h3>Line 4</h3></em>
                                <em><h3>Line 5</h3></em>
                                <h2>File: src/test1/fib1.js</h2>
                                <em><h3>Line 3</h3></em>
                                <em><h3>Line 4</h3></em>
                                <em><h3>Line 5</h3></em>
                            </h1>
                        </div>

                        <div className="col-6">
                            <button className="primary">Student 2</button>
                            <h1 className="h1">Plagiarism Detected!
                                <br />
                                <h2>File: src/test2/Sample3.js</h2>
                                <em><h3>Line 12</h3></em>
                                <em><h3>Line 13</h3></em>
                                <h2>File: src/test2/fib2.js</h2>
                                <em><h3>Line 13</h3></em>
                                <em><h3>Line 14</h3></em>
                            </h1>
                        </div>
                    </div>
                    {/* Add in the side by side comparison from Vinay's end here. */}
                </div>
            </div>
        );
    }
}

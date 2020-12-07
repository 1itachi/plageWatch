import './AboutPage.css'
import React, { ReactNode } from "react";

export default class About extends React.Component {
    render(): ReactNode {
        return (
            <div className="card-group mt-4">
                <div className="col-sm border-info mb-3">
                    <div className=" border border-info">
                        <div className="card text-center">
                            <div className="card-header">
                                What is PlageWatch?
                            </div>
                            <div className="card-body ">
                                <ul className="list-group">
                                    <li className="list-group-item list-group-item-light text-dark">
                                        PlageWatch is a plagiarism detection application designed and built
                                        using TypeScript, ReactJS and NodeJS.
                                    </li>
                                    <li className="list-group-item list-group-item-light text-dark">
                                        PlageWatch can be used to detect similarity between two code bases written in JavaScript.
                                    </li>
                                    <li className="list-group-item list-group-item-light text-dark">
                                       The application can detect plagiarism for
                                        both single and multiple files present in any given two folders.
                                    </li>
                                    <li className="list-group-item list-group-item-light text-dark">
                                        PlageWatch can find the similarities between files which are deeply nested
                                        inside
                                        directories.
                                    </li>
                                    <li className="list-group-item list-group-item-light text-dark">
                                        PlageWatch goes beyond textual difference and
                                        detect strategies to avoid detection such as renaming variables, extracting code
                                        into functions, moving code, changing comments, etc to find similarities between
                                        two submitted submissions.
                                    </li>
                                    <li className="list-group-item list-group-item-light text-dark">
                                        PlageWatch interface includes visual diff of the code portions on code compare
                                        page
                                        where similarites between two files is
                                        highlighted in red color.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm border-info mb-3">
                    <div className=" border border-info">
                        <div className="card text-center">
                            <div className="card-header">
                                How PlageWatch can help to find similarities between two submissions?
                            </div>
                            <div className="card-body ">
                                <ul className="list-group">
                                    <li className="list-group-item list-group-item-light text-dark">
                                        The algorithm uses Abstract Syntax Trees (AST) to detect plagiarism in each Javascript file. 
                                    </li>
                                    <li className="list-group-item list-group-item-light text-dark">
                                        PlageWatch algorithm transforms
                                        each JavaScript file into an AST. 
                                    </li>
                                    <li className="list-group-item list-group-item-light text-dark">
                                        AST nodes generated from two different sumbissions are compared. 
                                    </li>
                                    <li className="list-group-item list-group-item-light text-dark">
                                        Once the comparison is done the similarity score is displayed. The score indicates the percentage
                                        of similarity of submission 1 with respect to submission 2.
                                    </li>
                                    <li className="list-group-item list-group-item-light text-dark"> 
                                        On campare page, the similiarities found between the two submissions can be visualized.
                                    </li>
                                    <li className="list-group-item list-group-item-light text-dark">
                                       Note: PlageWatch is robust
                                        and cannot be easily fooled by renaming the variables, changing the structure of code, adding comments or 
                                        breaking code into multiple files.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col border-info mb-3">
                    <div className=" border border-info">
                        <div className="card text-center">
                            <div className="card-header">
                                How to use PlageWatch?
                            </div>
                            <div className="card-body ">
                                <ul className="list-group">
                                    <li className="list-group-item list-group-item-light text-dark"> To use PlageWatch
                                        user has to upload two zip files containing JavaScript files.
                                        Note: Files which are not JavaScript are ignored.
                                    </li>
                                    <li className="list-group-item list-group-item-light text-dark"> 
                                        After uploading the two zip files, The user has to click <em><b>Check Plagiarism</b></em> button to trigger the 
                                        plagiarism check on uploaded files.
                                    </li>
                                    <li className="list-group-item list-group-item-light text-dark"> PlageWatch
                                        application generates the result which
                                        user can see in the form of percentage. The percentage indicates the percentage
                                        of similarity of submission 1 with respect to submission 2.
                                    </li>
                                    <li className="list-group-item list-group-item-light text-dark"> If there is any plagiarism found, user can click on <em><b>Compare</b></em> button 
                                    to go to code compare page.
                                    </li>
                                    <li className="list-group-item list-group-item-light text-dark"> On code compare
                                        page user can see two code panels and the
                                        lines on which the similarity is detected by PlageWatch algorithm is
                                        highlighted in red. By clicking on <em><b>next</b></em> and  <em><b>prev</b></em> buttons
                                        User can see all the files in two submissions where the similarity was
                                        found.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
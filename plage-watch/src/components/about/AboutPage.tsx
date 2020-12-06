import './AboutPage.css'
import React from "react";

export default class About extends React.Component {


    render() {
        return (
            <div className="card-group">
                <div className="col border-info mb-3">
                    <div className=" border border-info">
                        <div className="card text-center">
                            <div className="card-header text-primary">
                                What is PlageWatch?
                            </div>
                            <div className="card-body ">
                                <ul className="list-group">
                                    <li className="list-group-item list-group-item-light text-dark">
                                        PlageWatch is a Web Application designed and build
                                        using TypeScript, ReactJS and NodeJS.
                                    </li>
                                    <li className="list-group-item list-group-item-light text-dark">
                                        PlageWatch can be use to detect plagiarism between two projects built using
                                        JavaScript.
                                    </li>
                                    <li className="list-group-item list-group-item-light text-dark">
                                        PlageWatch is a highly efficient software that can detect plagiarism for
                                        both single and multiple files present in any given two folders.
                                    </li>
                                    <li className="list-group-item list-group-item-light text-dark">
                                        PlageWatch can find the similarities between files which are deeply nested inside
                                        directories.
                                    </li>
                                    <li className="list-group-item list-group-item-light text-dark">
                                        PlageWatch goes beyond textual difference and
                                        detect strategies to avoid detection such as renaming variables, extracting code
                                        into functions, moving code, changing comments, etc to find similarities between
                                        two submitted submissions. our user interface should include kind of visual diff of the code portions
                                    </li>
                                    <li className="list-group-item list-group-item-light text-dark">
                                        PlageWatch interface includes visual diff of the code portions on code compare page
                                        where similarites between two files in which plagiarism is detected is highlighted in red color.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col border-info mb-3">
                    <div className=" border border-info">
                        <div className="card text-center">
                            <div className="card-header text-primary">
                                How PlageWatch can help to find similarities between two submissions?
                            </div>
                            <div className="card-body ">
                                <ul className="list-group">
                                    <li className="list-group-item list-group-item-light text-dark">
                                        The algorithm use to detect plagiarims uses the principle of Abstract Syntax
                                        Trees which is use to represent each piece of
                                        code written in .js files in the form of Nodes
                                    </li>
                                    <li className="list-group-item list-group-item-light text-dark">
                                        PlageWatch algorithm detects
                                        each JavaScript file and transform it into AST nodes.
                                    </li>
                                    <li className="list-group-item list-group-item-light text-dark">
                                        Once the comaprison is done the results are send
                                        at the front end.
                                    </li>
                                    <li className="list-group-item list-group-item-light text-dark"> The percentage of similarity between two projects can be
                                        seen as well as the line numbers on which the plagiarism is found can be
                                        seen
                                        once the user navigates to code compare page.
                                    </li>
                                    <li className="list-group-item list-group-item-light text-dark">
                                        PlageWatch algorithm is robust
                                        and cannot be easily fooled by just changing the name of variables,
                                        there orders in which they are declared in JavaScript files and many other
                                        complex scenarios.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col border-info mb-3">
                    <div className=" border border-info">
                        <div className="card text-center">
                            <div className="card-header text-primary">
                                How to use PlageWatch?
                            </div>
                            <div className="card-body ">
                                <ul className="list-group">
                                    <li className="list-group-item list-group-item-light text-dark"> To use PlageWatch
                                        user has to generate .zip files of two submissions.
                                    </li>
                                    <li className="list-group-item list-group-item-light text-dark"> Once the .zip
                                        files are
                                        generated user needs to upload it on two drop zones and press
                                        compare button.
                                    </li>
                                    <li className="list-group-item list-group-item-light text-dark"> PlageWatch
                                        applicaiton is fast and within a few seconds it will genrate its
                                        output which
                                        user can see in the form of percentage which shows similarity
                                        between two projects detected by PlageWatch algorithm.
                                    </li>
                                    <li className="list-group-item list-group-item-light text-dark"> If there is a
                                        similarity of 80% or more then it is flagged in red color and if
                                        user wishes to see the file by file comparison then compare button
                                        is
                                        provided which ones press navigates User to code compare page.
                                    </li>
                                    <li className="list-group-item list-group-item-light text-dark"> On code compare
                                        page User can see two code panes and the
                                        lines on which the similarity is detected by PlageWatch algorithm is
                                        highlighted in red. By pressing next and prev buttons
                                        User can see all the files in two submissions where similarity is
                                        found.
                                    </li>
                                    <li className="list-group-item list-group-item-light text-dark">PlageWatch only
                                        detects similarity between JavaScript files so care must be taken by
                                        the user to not check submissions build in any other programing
                                        languages

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
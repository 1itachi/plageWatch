import './AboutPage.css'
import React from "react";

export default class About extends React.Component {


    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="row row-cols-1 row-cols-md-2">
                        <div className="col border-info mb-3 ">
                            <div className=" border border-info">
                                <div className="card text-center">
                                    <div className="card-header text-primary">
                                        What is Plagiarism?
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text ">
                                            Plagiarism is the representation of another author's language, thoughts,
                                            ideas, or expressions as one's own original work.
                                            In educational contexts, there are differing definitions of plagiarism
                                            depending on the institution.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col border-info mb-3">
                            <div className=" border border-info">
                                <div className="card text-center">
                                    <div className="card-header text-primary">
                                        What is PlageWatch?
                                    </div>
                                    <div className="card-body ">
                                        <p className="card-text">PlageWatch is a Web Application designed and build
                                            using TypeScript, ReactJS and NodeJS.
                                            PlageWatch can be use to detect plagiarism between two projects built using
                                            JavaScript.
                                            PlageWatch is a highly efficient software that can detect plagiarism for
                                            both single and multiple files present in any given two folders.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col border-info mb-3">
                            <div className=" border border-info">
                                <div className="card text-center">
                                    <div className="card-header text-primary">
                                        How PlageWatch can help?
                                    </div>
                                    <div className="card-body ">
                                        <p className="card-text">PlageWatch can detect plagiarism between single or
                                            multiple files.
                                            The algorithm use to detect plagiarims uses the principle of Abstract Syntax
                                            Trees which is use to represent each piece of
                                            code written in .js files in the form of Nodes. PlageWatch algorithm detects
                                            each JavaScript file and transform it into AST nodes.
                                            These Nodes are use at the backend to detect plagiarism between two
                                            JavaScript files. Once the comaprison is done the results are send
                                            at the front end. The percentage of similarity between two projects can be
                                            seen as well as the line numbers on which the plagiarism is found can be
                                            seen
                                            once the user navigates to code compare page. PlageWatch algorith is robust
                                            and cannot be easily fooled by just changing the name of variables,
                                            there orders in which they are declared in JavaScript files and many other
                                            complex scenarios.
                                            principle of </p>
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
                                        <p className="card-text">
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
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
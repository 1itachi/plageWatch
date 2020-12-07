import React, { ReactElement } from "react";
import './Footer.css'

export default function Footer(): ReactElement {
    return (
        <div className="footer footer-style border-top row">
            <div className="col-sm-6 offset-sm-1">
                <p className="footer-header col-sm-4 center"><b><u>CONTRIBUTORS</u></b></p>
                <div className="row">
                    <a className="col-sm-3 footer-element mr-3 ml-3"
                       href="https://www.linkedin.com/in/deepak-kumar-bb1810115/" target="_blank" rel="noreferrer">Deepak Kumar<i
                        className="fab fa-linkedin"/></a>
                    <a className="col-sm-3 offset-sm-0 footer-element" href="https://www.linkedin.com/in/jasonlu123/" target="_blank" rel="noreferrer">Jason
                        Lu<i className="fab fa-linkedin"/></a>
                </div>
                <div className="row">
                    <a className="col-sm-3 footer-element mr-3 ml-3"
                       href="https://www.linkedin.com/in/sanket-ghanmare/" target="_blank" rel="noreferrer">Sanket Ghanmare<i
                        className="fab fa-linkedin"/></a>
                    <a className="col-sm-3 footer-element" href="https://www.linkedin.com/in/vinaysj/" target="_blank" rel="noreferrer">Vinay S.Joseph<i
                        className="fab fa-linkedin"/></a>
                </div>
            </div>
            <div className="cols-sm-6 m-auto">

                <div className="row">
                    <i className="fas fa-map-marker-alt float-right">
                        <a className=" footer-element mr-3 ml-3" href="https://www.khoury.northeastern.edu/" target="_blank" rel="noreferrer">Khoury
                            College of Computer Sciences</a>
                    </i>
                </div>
                <div className=" footer-element mr-3 ml-3 ">
                    <a className="col-sm-3 footer-element"
                       href="https://www.northeastern.edu/" target="_blank" rel="noreferrer">
                        <span className="font-weight-bold"> Northeastern University, 2020</span></a>
                </div>
            </div>
        </div>
    );
}

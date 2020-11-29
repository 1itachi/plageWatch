import React from "react";
import './Footer.css'

export default function  Footer () {
        return (
            <div className="footer footer-style border-top row">
                <div className="col-sm-6 offset-sm-1">
                    <p className= "footer-header col-sm-4 center"><u>CONTRIBUTORS</u></p>
                    <div className="row">
                    <a className= "col-sm-3 footer-element mr-3" href="https://www.linkedin.com/in/deepak-kumar-bb1810115/">Deepak Kumar <i className="fab fa-linkedin"></i></a>
                    <a className= "col-sm-3 offset-sm-0 footer-element" href="https://www.linkedin.com/in/jasonlu123/">Jason Lu<i className="fab pl-1 fa-linkedin"></i></a>
                    </div>
                    <div className="row">
                    <a className= "col-sm-3 footer-element mr-3" href="https://www.linkedin.com/in/sanket-ghanmare/"> Sanket Ghanmare<i className="fab fa-linkedin"></i></a>
                    <a className= "col-sm-3 footer-element" href="https://www.linkedin.com/in/vinaysj/">Vinay S.Joseph<i className="fab fa-linkedin"></i></a>
                    </div>
                </div>
                <div className="col-sm-5 center">
                <i className="fas fa-map-marker-alt float-right"><span className="location pl-2">Northeastern University, 2020</span></i>
                </div>

            </div>
        );
}

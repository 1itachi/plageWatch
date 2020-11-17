import React from "react";
import './Navigation.css'
import detect from './../../images/plagewatch.jpg'

export default class NavBar extends React.Component {
    render() {
        return(

              <div className="col-sm-6 row center">
                <img className="ml-4 plagewatch-image-style" src ={detect} alt="detect"/>
              <h1 className="mt-4 nav-text-style"> PlageWatch</h1>
              </div>


              
        );
      }
}

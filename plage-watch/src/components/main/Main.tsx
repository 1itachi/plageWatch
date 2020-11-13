import React from "react";
import Navbar from "./../navigation/Navigation";
import Upload from './../upload/UploadPage';
import './Main.css'


export default class MainPage extends React.Component {
  render() {
    return(
        <div>
      <nav className="navbar sticky-top nav-style navbar-expand-lg navbar-style">   
        <Navbar/>
        </nav>
        <Upload/>
        </div>
    );
  }
}
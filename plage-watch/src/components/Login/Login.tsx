import React from "react";
import Navbar from "./../navigation/Navigation";
import Upload from './../upload/UploadPage';
import './Login.css';
import detect from './../../images/plagewatch.jpg';
import { Link } from "react-router-dom";

export default class LoginPage extends React.Component {

    render() {
        return (
            <div className="col-sm-6 row center">
                <img className="ml-4 plagewatch-image-style" src={detect} alt="detect" />
                <h1 className="mt-4 nav-text-style"> PlageWatch</h1>
                <br></br>
                <div className="container">
                    <h1>Login Page For User Login</h1>
                    <h2>Username: <input type="username" placeholder="username" /></h2>
                    <br></br>
                    <h2>Password: <input type="password" placeholder="password" /></h2>
                    <br></br>
                    <div className="btn border rounded login-button text-light p-3">
                        <a href="localhost:3000/Upload" className="btn btn-primary">Login</a>
                    </div>
                </div>
            </div>
        );
    }
}

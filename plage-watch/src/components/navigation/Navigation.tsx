import React from "react";
import './Navigation.css'
import detect from './../../images/plagewatch.jpg'
import { Navbar, Nav } from 'react-bootstrap';
export default class NavBar extends React.Component {
  render() {
    return (
      <Navbar
        // sticky={'top'}
        collapseOnSelect
        expand="lg"
        className="header-margin navbar-style"
        variant="light"
      >
        <div className="col-sm-6 row center">
          <img className="ml-4 plagewatch-image-style" src={detect} alt="detect" />
          <h1 className="mt-3 nav-text-style"> PlageWatch</h1>
        </div>
       </Navbar>
    );
  }
}

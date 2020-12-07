import React, { ReactNode } from "react";
import './Navigation.css'
import detect from './../../images/plagewatch.jpg'
import { Navbar } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

export default class NavBar extends React.Component {
  render(): ReactNode {
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        className="header-margin navbar-style"
        variant="light"
      >
        <div className="col-sm-6 row center">
        <a href={'Upload'}>
          <div className="flex-inline d-flex">
          <img className="ml-4 plagewatch-image-style" src={detect} alt="detect" />
           <h1 className="mt-3 nav-text-style"> PlageWatch </h1>
           </div>
           </a>
        </div>

        <div className="col-sm-6 row center">
          <span className="mt-3 nav-text-style">
            <LinkContainer to='/about'>
              <a className="mt-3 nav-text-style">
                <i className="fas fa-book-reader mr-1" />
                  About
              </a>
            </LinkContainer>
          </span>
        </div>
      </Navbar>
    );
  }
}

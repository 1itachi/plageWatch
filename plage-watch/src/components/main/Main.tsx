import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import CodeCompare from "../codecomparison/CodeCompare";
import NavBar from './../navigation/Navigation';
import Upload from './../upload/UploadPage';
import './Main.css'


export default class MainPage extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <NavBar />

          <Switch>
            <Route path='/home' render={() => <Upload />} />
            <Route path='/codecomparison' render={() => <CodeCompare />} />
            <Redirect exact from="/" to="/home" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

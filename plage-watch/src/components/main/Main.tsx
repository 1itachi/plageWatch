import React, { ReactNode } from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import CodeCompare from "../codecomparison/CodeCompare";
import NavBar from './../navigation/Navigation';
import Upload from './../upload/UploadPage';
import Footer from './../footer/Footer';
import PlagResult from "../../customTypes/PlagiarismData";


interface PlagState {
  plagiarism_data: PlagResult;
}

export default class MainPage extends React.Component<{}, PlagState> {
  constructor(props:{}) {
    super(props);
    this.state={
      plagiarism_data:{} as PlagResult
    }
    this.updatePlagData = this.updatePlagData.bind(this);
  }

  updatePlagData(data: PlagResult): void {
    this.setState({plagiarism_data: data});
  }

  render(): ReactNode {
    const {plagiarism_data} = this.state;
    return (
      <div>
        <BrowserRouter>
          <NavBar />

          <Switch>
            <Route path='/home' render={() => <Upload updatePlagData={this.updatePlagData} plagiarism_data={plagiarism_data} />} />
            <Route path='/codecomparison' render={() => <CodeCompare plagiarism_data={plagiarism_data} />} />
            <Redirect from="/" to="/home" />
          </Switch>
          <Footer/>
        </BrowserRouter>
      </div>
    );
  }
}

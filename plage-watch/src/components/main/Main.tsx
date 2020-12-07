import React, { ReactNode } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import CodeCompare from "../codecomparison/CodeCompare"
import NavBar from "./../navigation/Navigation"
import Upload from "./../upload/UploadPage"
import Footer from "./../footer/Footer"
import About from "./../about/AboutPage"

interface PlagState {
  empty_check: boolean
}

export default class MainPage extends React.Component<{}, PlagState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      empty_check: localStorage.getItem("data") === null,
    }
    this.toggleEmptyCheck = this.toggleEmptyCheck.bind(this)
  }

  toggleEmptyCheck() {
    this.setState({ empty_check: false })
  }

  render(): ReactNode {
    const { empty_check } = this.state

    return (
      <div>
        <BrowserRouter>
          <NavBar />

          <Switch>
            <Route
              path="/home"
              render={() => <Upload toggleEmptyCheck={this.toggleEmptyCheck} />}
            />
            {empty_check && <Redirect from="/codecomparison" to="/home" />}
            <Route path="/codecomparison" render={() => <CodeCompare />} />

            <Route path="/about" render={() => <About />} />

            <Redirect from="/" to="/home" />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    )
  }
}

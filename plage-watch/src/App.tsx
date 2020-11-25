import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import MainPage from './components/main/Main';
import LoginPage from './components/login/Login';
import Results from "./components/results/Results";

function App() {
  return (
    <Router>
      <div>
        <div className="App">
          <Switch>
            {/*
            <Route path="/" component={LoginPage} exact />
            */}
            <Route path="/main" component={MainPage} />
            <Route path="/results" component={Results} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

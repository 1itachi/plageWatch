import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import MainPage from './components/main/Main';
import UploadPage from './components/upload/UploadPage';
import CodeCompare from './components/codecomparison/CodeCompare';

function App() {
  return (
    <div className="App">
      <MainPage />
    </div>
  );
}

export default App;

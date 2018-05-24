import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Pronostico from'./pantallaPronostico.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Pronostico/>
      </div>
    );
  }
}

export default App;

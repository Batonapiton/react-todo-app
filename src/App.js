import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoContainer from './components/todoContainer';

class App extends Component {
  render() {
    return (
      <div className="App  mx-auto">
        <TodoContainer/>
      </div>
    );
  }
}

export default App;

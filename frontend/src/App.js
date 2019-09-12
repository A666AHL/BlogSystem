import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    function check() {
        let username = localStorage.getItem("username");
        let password = localStorage.getItem("password");

        console.log(username + password);
    }
  return (
    <div className="App">
      <header className="App-header">
          <button onClick={check}>身份验证</button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

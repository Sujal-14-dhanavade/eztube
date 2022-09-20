import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {useState} from 'react';


function App() {
  let [data, setData] = useState("");
  function handleClick() {
    axios.get("/getData").then(response => {setData(response.data)})
  };
  
  return (
    <div className="App">
      <header className="App-header">
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
        <button onClick={handleClick}>Get Data</button>
          {data}
      </header>
    </div>
  );
}

export default App;

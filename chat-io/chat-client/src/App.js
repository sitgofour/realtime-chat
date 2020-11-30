import React, { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';


function App() {

  const [response, setResponse] = useState("");
  const [message, setMessage] = useState("");

  // When user loads page connect to server 
  useEffect(() => {
    const socket = io('http://localhost:8000', {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    });

    socket.on('server message', (message) => {
      setResponse(message);
    });
  }, []);

  function handleInputChange(e) {
    setMessage(e.target.value);
  }

  return (
    <div className="App">
      <h1>Chat-Client</h1>
        <p>{response}</p>
        <p>{message}</p>
        <input type="text" onChange={handleInputChange}/>
    </div>
  );
}

export default App;

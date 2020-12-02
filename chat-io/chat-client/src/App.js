import React, { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';


function App() {

  const [response, setResponse] = useState("");
  const [message, setMessage] = useState("");
  // const [chatMessages, setChatMessages] = useState([]);

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
      // setChatMessages((c) => {
      //   return [...chatMessages, message];
      // });
    });

    return socket;

  }, []);

  function handleInputChange(e) {
    setMessage(e.target.value);
  }

  function handleMessageSend() {
    
  }

  return (
    <div className="App">
      <h1>Chat-Client</h1>
        <p>{response}</p>
        <p>{message}</p>
        <div>
          {/* {chatMessages.map((chatMsg) => {
            return <p>{chatMsg}</p>
          })} */}
        </div>
       
        <input type="text" onChange={handleInputChange}/>
        <button type="submit" onClick={handleMessageSend}>Send</button>
    </div>
  );
}

export default App;

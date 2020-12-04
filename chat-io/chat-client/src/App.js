import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import io from 'socket.io-client';


function App() {

  const [response, setResponse] = useState("");
  const [message, setMessage] = useState("");
  const socketRef = useRef();
  const [chatMessages, setChatMessages] = useState([]);

  // When user loads page connect to server 
  useEffect(() => {
    socketRef.current = io('http://localhost:8000', {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    });

    socketRef.current.on('bot response', (message) => {
      setResponse(message);
      setChatMessages([message]);
    });

    socketRef.current.on('chat message from server', (message) => {
      setChatMessages((currentChatMessages) => {
        return [...currentChatMessages, message];
      });
      console.log({message});
    })


  }, []);

  function handleInputChange(e) {
    setMessage(e.target.value);
  }

  function handleMessageSend() {
    socketRef.current.emit('userMessageFromClient', message);
  }

  return (
    <div className="App">
      <h1>Chat-Client</h1>
        <p>{response}</p>
        <div>
          {/* {chatMessages} */}
          {chatMessages.map((chatMsg) => {
            return <p>{chatMsg}</p>
          })}
        </div>
       
        <input type="text" onChange={handleInputChange}/>
        <button type="submit" onClick={handleMessageSend}>Send</button>
    </div>
  );
}

export default App;

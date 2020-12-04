import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import io from 'socket.io-client';
import ChatMessage from './ChatMessage.js';


function App() {

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
      setChatMessages((currentChatMessages) => {
        return [...currentChatMessages, message];
      });
    });

    socketRef.current.on('chat message from server', (message) => {
      setChatMessages((currentChatMessages) => {
        return [...currentChatMessages, message];
      });
    })


  }, []);

  function handleInputChange(e) {
    setMessage(e.target.value);
  }

  function handleMessageSend() {
    socketRef.current.emit('userMessageFromClient', message);
    document.getElementById("msgInput").value = "";
    setMessage("");
  }

  function handleKeyDown(e) {
    if(e.key === "Enter") {
      handleMessageSend();
    }
  }

  return (
    <div className="App">
      <h1>Chat-Client</h1>

        <div>
          {chatMessages.map((chatMsg, index) => {
            return <ChatMessage message={chatMsg} key={index}/>
          })}
        </div>
       
        <input id="msgInput" type="text" onChange={handleInputChange} onKeyDown={handleKeyDown}/>
        <button onClick={handleMessageSend}>Send</button>
    </div>
  );
}

export default App;

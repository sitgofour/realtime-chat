import React from "react";

const ChatBox = ({ text, username, handleTextChange }) => (
  <div>
          <input
            type="text"
            value={text}
            placeholder="chat here..."
            onChange={handleTextChange}
            onKeyDown={handleTextChange}
          />
    <h4>Hello, {username}</h4>
  </div>
);

export default ChatBox;
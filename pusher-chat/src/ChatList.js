import React from "react";

const ChatList = ({ chats }) => (
  <ul>
    {chats.map(chat => {
      return (
        <div>
            <div key={chat.id}>
                <p>
                <strong>{chat.username}</strong>
                </p>
                <p>{chat.message}</p>
            </div>
            <div>
                <img src="" alt="logo" />
            </div>
        </div>
      );
    })}
  </ul>
);


export default ChatList;
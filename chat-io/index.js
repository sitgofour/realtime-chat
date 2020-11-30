const app = require('express')();
const server = require('http').createServer(app);
const myBot = require('./bot.js');


const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

io.on('connection', (socket) => {
    const myMessage = myBot.botFunction();
    socket.emit('server message', myMessage);
    console.log('a user connected');


  socket.on('message', (msg) => {
    let botResponse = myBot.parseIncomingMessage(msg); 

    if(botResponse.length) {
      socket.emit('server message', botResponse);
    }
  });
  
});





  server.listen(8000, () => {
    console.log('listening on port 8000');
});
const app = require('express')();
const server = require('http').createServer(app);


const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

io.on('connection', (socket) => {
    socket.emit('server message', 'hellooo there');
    console.log('a user connected');
  });



  server.listen(8000, () => {
    console.log('listening on port 8000');
});
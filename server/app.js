const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const path = require('path');

const messageGenerator = require('./utils/messageGenerator');
const app = express();


const port = process.env.PORT || 8000;
let server = http.createServer(app);
let io = socketIo(server);

app.use(express.static(path.join(__dirname, '/../public')));
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
})
io.on('connection', (socket) => {
    console.log('a new user is connected');
    
  socket.emit('newMessage',messageGenerator('Admin','welcome to the chat'));
    socket.broadcast.emit('newMessage',messageGenerator('admin','new user is connected'));

    socket.on('createMessage', (message) => {
      io.emit('newMessage',messageGenerator(message.from,message.text));
    });
      socket.on('sendLocation',(message)=>{
          io.emit('sendLocationServer',{
             latitude:message.latitude,
             longitude:message.longitude 
          });
      })

    socket.on('disconnect', () => {
        console.log('User is disconnected');
    });
});

server.listen(port, () => {
    console.log(`server is successfully running in port: ${port}`);
});

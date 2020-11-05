const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');

const { messageGenerator, generateLocation } = require('./utils/messageGenerator');
//const formDataCheck=require('../public/javascript/formDataCheck');
const app = express();


const port = process.env.PORT || 8000;
let server = http.createServer(app);
let io = socketIo(server);


app.use(express.static(path.join(__dirname, '/../public')));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile('htmlFile/homePage.html', { root: 'public' })
})
app.get('/chatPage', (req, res) => {
    console.log(req.body);
    res.sendFile('htmlFile/chatPage.html', { root: 'public' })
})
app.post('/chatPage', (req, res) => {
    res.sendFile('htmlFile/chatPage.html', { root: 'public' })
})

io.on('connection', (socket) => {
    console.log('a new user is connected');
    socket.on('joinRoom', (formData, callback) => {
       
        if (!formDataCheck(formData.name) || !formDataCheck(formData.roomName)) {
            callback('Name and room are required');
        }else{

            socket.join(formData.roomName);

            io.to(formData.roomName).emit('newMessage', {
               from: 'admin',
               text:'welcome plz'
            })
            io.to(formData.roomName).emit('newMessage', messageGenerator('Admin', 'New user joined'))

        }
     

        
    });

    
    socket.on('createMessage', (message) => {
        io.emit('newMessage', messageGenerator(message.from, message.text));
    });
    socket.on('sendLocation', (message) => {
        io.emit('sendLocationServer', generateLocation(message.latitude, message.longitude));
    });


    socket.on('disconnect', () => {
        console.log('User is disconnected');
    });
});
let formDataCheck = (checkData) => {
    return typeof checkData === 'string' && checkData.trim().length > 0;
}

module.exports = formDataCheck();

server.listen(port, () => {
    console.log(`server is successfully running in port: ${port}`);
});

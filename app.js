const express=require('express');
const socketIo=require('socket.io');
const http=require('http');
const app=express();


const port=process.env.PORT||8000;
let server=http.createServer(app);
let io=socketIo(server); 
app.get('/',(req,res)=>{
  res.sendFile('index.html',{root:'public'});
})

server.listen(port,()=>{
    console.log(`server is successfully running in port: ${port}`);
});

const express=require('express');
const dotenv=require('dotenv');
const app=express();

const port=process.env.PORT||8000;

app.get('/',(req,res)=>{
    res.send('welcome to chatWorld');
})

app.listen(port,()=>{
    console.log(`server is successfully running in port: ${port}`);
});

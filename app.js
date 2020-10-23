const express=require('express');
const dotenv=require('dotenv');
const app=express();

const port=process.env.PORT||8000;

app.get('/',(req,res)=>{
    res.send('balla balla vayo mula');
})

app.listen(port,()=>{
    console.log(`server is successfully running in port: ${port}`);
});

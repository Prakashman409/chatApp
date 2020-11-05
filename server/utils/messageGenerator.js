let messageGenerator=(from,text)=>{
return {
    from,
    text,
    createdAt:new Date().getTime()
}

};

let generateLocation=(lat,long)=>{
    return{
        from:'User',
        lat,
        long,
        url:`https://www.google.com/maps?q=${lat},${long}`,
        createdAt:new Date().getTime()
    }
}
module.exports={messageGenerator,generateLocation};

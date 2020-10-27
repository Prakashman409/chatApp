let socket=io();
socket.on('connect',()=>{
    console.log('connected to server');

});
socket.on('newMessage',(message)=>{
    $('#body').append(`<li>${message.from}:${message.text}`);
}) 

socket.on('sendLocationServer',(message)=>{
   
   $('#body').append(`<a href="https://www.google.com/maps?q=${message.latitude},${message.longitude}" target="_blank">this is my location<a></br>`);

});

$(document).ready(function(){
    $('#send-btn').on('click',(e)=>{
        e.preventDefault();
        var message=$('#chatMessage').val();
        socket.emit('createMessage',{
            from:'User',
            text:message
        });
    })
    $('#send-location').on('click',function(){
        if(!navigator.geolocation){
            socket.emit('createMessage',{
                from:'user',
                text:'geolocation is not supported by your browser'
            })
        }else{
            navigator.geolocation.getCurrentPosition(success,error);
        }
    })
    function success(position){
        console.log(position);

       socket.emit('sendLocation',{
           latitude:position.coords.latitude,
           longitude:position.coords.longitude
           
       })
      
    }
    function error(){
        console.log('cant get your location');
    }
});


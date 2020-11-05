

let socket = io();
socket.on('connect', () => {
    console.log('connected to server');

});

function scrollToButton() {
    let message = document.getElementById("chat-scroll").lastElementChild;
    message.scrollIntoView();
}

socket.on('newMessage', (message) => {
    let formatDate = moment(message.createdAt).format('LT');
    const template = $('.message-template').html();

    const html = Mustache.render(template, {
        from: message.from,
        createdAt: formatDate,
        text: message.text

    });
    $('.chat-body').append(html);
    scrollToButton();

});


socket.on('sendLocationServer', (message) => {
    let formatDate = moment(message.createdAt).format('LT');
    console.log('from location ::', message);
    const template = $('#geo-location').html();
    const html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formatDate
    });
    $('.chat-body').append(html);

    scrollToButton();
});

$(document).ready(function () {
    $('#send-btn').on('click', (e) => {
        e.preventDefault();
        var message = $('#chatMessage').val();
        console.log(message);
        socket.emit('createMessage', {
            from: 'User',
            text: message
        });
    })
    $('#send-location').on('click', function () {
        if (!navigator.geolocation) {
            socket.emit('createMessage', {
                text: 'geolocation is not supported by your browser'
            })
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    })
    function success(position) {
        console.log(position);

        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude

        })

    }
    function error() {
        console.log('cant get your location');
    }

    $('.submit-form').on('click', () => {
        let name = $('.chatName').val();
        let roomName = $('.roomName').val();
        let formData = { name, roomName };
        console.log(formData);
        socket.emit('joinRoom', formData, function (err) {
            if (err) {
                alert(err);
                window.location.href = '/';
            } else {
                console.log('no error')
            }
        });
        
        
        
    })


});


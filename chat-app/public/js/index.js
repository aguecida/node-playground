let socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', message => {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = $('#message-template').html();

    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
});

socket.on('newLocationMessage', message => {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = $('#location-message-template').html();
    
    let html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
});

$(document).on('submit', '#message-form', e => {
    e.preventDefault();
    
    let textbox = $(e.target).find('input');

    socket.emit('createMessage', { from: 'User', text: textbox.val() }, () => {
        textbox.val('');
    });
});

$(document).on('click', '#send-location', e => {
    if (!navigator.geolocation) return alert('Geolocation not supported by your browser');

    navigator.geolocation.getCurrentPosition(position => {
        socket.emit('createLocationMessage', { latitude: position.coords.latitude, longitude: position.coords.longitude });
    }, () => {
        alert('Unable to get location');
    });
});

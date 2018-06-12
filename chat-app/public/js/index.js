$(document).ready(() => {

    let socket = io();

    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    socket.on('newMessage', data => {
        let li = $('<li></li>').text(`${data.from}: ${data.text}`);
        $('#messages').append(li);
    });

    socket.on('newLocationMessage', data => {
        let li = $('<li></li>').text(`${data.from}: `);
        let a = $('<a target="_blank">My current location</a>').attr('href', data.url);
        
        li.append(a);
        $('#messages').append(li);
    });

    $('#message-form').on('submit', e => {
        e.preventDefault();
        
        socket.emit('createMessage', { from: 'User', text: $(e.target).find('input').val() }, () => {
            $(e.target).find('input').val('');
        });
    });

    $('#send-location').on('click', e => {
        if (!navigator.geolocation) return alert('Geolocation not supported by your browser');

        navigator.geolocation.getCurrentPosition(position => {
            socket.emit('createLocationMessage', { latitude: position.coords.latitude, longitude: position.coords.longitude });
        }, () => {
            alert('Unable to get location');
        });
    });
});

let socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', data => {
    let className = data.from === 'Admin' ? 'admin-message' : 'user-message';
    let messageText = data.from === 'Admin' ? data.text : `${data.from}: ${data.text}`;

    let li = $('<li></li>').addClass(className).text(messageText);
    $('#messages').append(li);
});

socket.on('newLocationMessage', data => {
    let li = $('<li></li>').text(`${data.from}: `);
    let a = $('<a target="_blank">My current location</a>').attr('href', data.url);
    
    li.append(a);
    $('#messages').append(li);
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

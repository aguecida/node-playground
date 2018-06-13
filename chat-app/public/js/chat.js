let scrollToBottom = () => {
    let messages = $('#messages');
    let newMessage = messages.children('li:last-child');

    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    
    if (clientHeight + scrollTop + newMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
};

let socket = io();

socket.on('connect', () => {
    let params = $.deparam(window.location.search);

    socket.emit('join', params, (err) => {
        if (err) {
            alert(err);
            window.location.href = '/';
        }
        else {
            console.log('Successfully joined room');
        }
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('updateUserList', users => {
    var ol = $('<ol></ol>');
    
    users.forEach(user => {
        ol.append($('<li></li>').text(user));
    });

    $('#users').html(ol);
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
    scrollToBottom();
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
    scrollToBottom();
});

$(document).on('submit', '#message-form', e => {
    e.preventDefault();
    
    let textbox = $(e.target).find('input');

    if (!textbox.val()) return;

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

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

    $('#message-form').on('submit', e => {
        e.preventDefault();
        
        socket.emit('createMessage', { from: 'User', text: $(e.target).find('input').val() }, () => {
            $(e.target).find('input').val('');
        });
    });
});

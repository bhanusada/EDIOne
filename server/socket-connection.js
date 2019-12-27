var socket = require('socket.io');
var db = require('../db/connector');
var VANBacklogs = require('./vanbacklogs');

var numOfUsers = 0;

var _socket;

var Socket = (server) => {

    var io = socket(server);

    io.on('connection', function (socket) {
        console.log('connected');
        numOfUsers = numOfUsers + 1;
        _socket = socket;
        socket.on('disconnect', function () {
            if (numOfUsers > 0) {
                numOfUsers = numOfUsers - 1;
            } else {
                numOfUsers = 0;
            }
            console.log('user disconnected');
        });

        socket.on('fromclient', function (message) {
            console.log('From client got a request');
            // socket.emit('refresh', { 'test': 'hello' });
        /*    const interval = setInterval(() => {
                console.log('Socket refresh');
                // socket.emit('refresh', { 'test': 'hello' });
                db.po()
                    .then( result => {
                        socket.emit('refresh', result);
                    })
                if (numOfUsers === 0) {
                    clearInterval(interval);
                }
            }, 8000) */
        })

        socket.on('backlogs', (formData) => {
            console.log(formData);
            var vanBacklogs = new VANBacklogs();
            vanBacklogs.start(formData, socket);
        })
    });
}

module.exports = {
    socketConnection: Socket,
    socket: _socket
}

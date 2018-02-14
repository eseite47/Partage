const User = require('../db/models/user');
const Link = require('../db/models/link');

module.exports = io => {

  io.on('connection', socket => {

    console.log(socket.id, ' has made a persistent connection to the server!');

    socket.on('new-link', message => {
      socket.broadcast.emit('new-link', message);
    });

    // socket.on('new-channel', channel => {
    //   console.log('Emiting!')
    //   socket.broadcast.emit('new-channel', channel);
    // });

  });

};

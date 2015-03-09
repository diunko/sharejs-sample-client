var express = require('express'),
    sharejs = require('share').server;

var server = express(
      express.static(__dirname + '/public')
    );

var options = {db: {type: 'none'}}; // See docs for options. {type: 'redis'} to enable persistance.

// Attach the sharejs REST and Socket.io interfaces to the server
sharejs.attach(server, options);

server.listen(3000, function(){
    console.log('Server running at http://127.0.0.1:3000/');
});

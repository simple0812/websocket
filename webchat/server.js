var app = require('koa')();
var _ = require('underscore');
var server = require('http').createServer(app.callback());
var io = require('socket.io')(server);
var users = [];

app.use(require('koa-static')(__dirname + '/public'));

io.on('connection', function(socket) {
	socket.on('disconnect', function() {
		users = _.without(users, socket.name)
		
		console.log('users.length -> ' + users.length)
		socket.broadcast.emit('updateUser', users)

	})

	socket.on('msg', function(data) {
		socket.broadcast.emit('updateChat', data)
	})

	socket.on('addUser', function(data) {
		socket.name = data.name;

		users.push(data.name);

		socket.emit('getUsers', users);
		socket.broadcast.emit('updateUser', users);
	})
});

server.listen(8002);
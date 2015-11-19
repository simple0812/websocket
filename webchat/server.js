var app = require('koa')();
var _ = require('underscore');
var server = require('http').createServer(app.callback());
var io = require('socket.io')(server);
var users = [];

app.use(require('koa-static')(__dirname + '/public'));

//io.emit和socket.broadcast.emit都能实现广播。
//前者会广播给所有人，包括自己
//后者会广播给自己以外的所有人
io.on('connection', function(socket) {
	socket.on('disconnect', function() {
		users = _.without(users, socket.name)
		
		console.log('users.length -> ' + users.length)
		socket.broadcast.emit('updateUser', users)

	})

	socket.on('msg', function(data) {
		// console.log(io.sockets.sockets)
		if(data.To) {
			console.log('private chat')
			var tSocket = _.find(io.sockets.sockets, function(item) {
				return item.name === data.To;
			})
			tSocket && tSocket.emit('updateChat', data);
		} else {
			console.log('public chat')
			socket.broadcast.emit('updateChat', data);
		}
	})

	socket.on('addUser', function(data) {
		socket.name = data.name;

		users.push(data.name);

		io.emit('updateUser', users);
	})
});

server.listen(8002, function() {
	console.log('listen at port 8002')
})
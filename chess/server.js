var app = require('koa')();
var _ = require('underscore');
var server = require('http').createServer(app.callback());
var io = require('socket.io')(server);
var users = [];

app.use(require('koa-static')(__dirname + '/public'));

io.on('connection', function(socket) {
	console.log(socket.id)

	socket.on('turn', function(data) {
		//广播
		io.emit('mm', data)
	})

	socket.on('disconnect', function() {
		io.emit('clean')
	})
});

server.listen(8003);
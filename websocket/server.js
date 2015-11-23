//websocket 服务端
var ws = require("nodejs-websocket")
var fs = require('fs');

var handler = {
	click: function(conn, msg) {
		msg = 'click|' + msg;
		server.connections.forEach(function(conn) {
			conn.sendText(msg)

		})
	},

	test: function(conn, msg) {
		conn.sendText('test|' + msg);
	}
}

var server = ws.createServer(function(conn) {
	conn.on("text", function(str) {
		var p = str.split('|');
		var action = p.shift();
		var msg = p.join('|');

		handler[action] && handler[action](conn, msg);
	})

	conn.on("close", function(code, reason) {
		console.log("Connection closed")
	})


	conn.on("error", function(code, reason) {
		console.log("Connection error", code, reason)
	})
}).listen(8008, function() {
	console.log('listen at port 8008')
})
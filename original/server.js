//websocket 服务端
var ws = require("nodejs-websocket")

var handler = {
	click: function(conn, msg) {
		msg = 'click|' + msg;
		server.connections.forEach(function (conn) {
	        conn.sendText(msg)
	    })
	},

	test: function(conn, msg) {
		msg = 'test|' + msg;
		conn.sendText(msg)
	}
}

var server = ws.createServer(function(conn) {
	conn.sendText("test|world")
	
	conn.on("text", function(str) {
		var action = str.split('|')[0];
		var msg = str.split('|')[1] || '';

		handler[action] && handler[action](conn, msg);
	})

	conn.on("close", function(code, reason) {
		console.log("Connection closed")
	})
}).listen(8008)
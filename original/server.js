//websocket 服务端
var net = require('net');
var crypto = require('crypto');

var server = net.createServer(function(socket) { //'connection' listener
	console.log('client connected');
	socket.on('data', function(buffer) {
		

		var data = buffer.toString();
		var headers = headerParser(data);

		if (headers['sec-websocket-key']) { //握手部分
			var key = headers['sec-websocket-key']

			var sha1 = crypto.createHash('sha1')
			console.log(key)
			sha1.end(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')
			key = sha1.read().toString('base64')
			socket.write(buildRequest('HTTP/1.1 101 Switching Protocols', {
				Upgrade: 'websocket',
				Connection: 'Upgrade',
				'Sec-WebSocket-Accept': key
			}))
		} else { //接受数据
			console.log('-------------')
			console.log(buffer)
			console.log('-------------')

			var i = 0;
			var found = false

			for (i = 0; i < buffer.length - 3; i++) {
				if (buffer[i] === 13 && buffer[i + 2] === 13 &&
					buffer[i + 1] === 10 && buffer[i + 3] === 10) {
					found = true
					break
				}
			}

			if (!found) {
				return false
			}

			data = buffer.slice(i + 4).toString();
			console.log(data)
		}
	});

	socket.on('end', function() {
		console.log('client end');
	});

	socket.on('connect', function() {
		console.log('client connect');
	});

	socket.on('close', function() {
		console.log('client close');
	});

	socket.on('error', function() {
		console.log('client error');
	});

});

server.listen(8004, function() { //'listening' listener
	console.log('server bound');
});

function headerParser(str) {
	var ret = {};
	var arr = str.split('\r\n');
	arr.forEach(function(item) {
		var p = item.split(':');
		var key = p.shift();
		var value = p.join(':');
		if (key) {
			ret[key] = value.trim();
			ret[key.toLowerCase()] = value.trim();
		}

	})

	return ret;
}
/*
data = this.buffer.slice(0, i + 4).toString().split('\r\n')
*/
function buildRequest(requestLine, headers) {
	var headerString = requestLine + '\r\n';

	for (var headerName in headers) {
		headerString += headerName + ': ' + headers[headerName] + '\r\n'
	}

	return headerString + '\r\n'
}
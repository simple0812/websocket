//websocket 服务端
var ws = require("nodejs-websocket")
var fs = require('fs');
var canvas = require('canvas')

var handler = {
	click: function(conn, msg) {
		msg = 'click|' + msg;
		server.connections.forEach(function(conn) {
			conn.sendText(msg)

		})
	},

	test: function(conn, msg) {
		var buffer = fs.readFileSync('11.png');
		var Canvas = require('canvas')
			  , Image = Canvas.Image
			  , canvas = new Canvas(200, 200)
			  , ctx = canvas.getContext('2d');

		fs.readFile('11.png', function(err, squid) {
			if (err) throw err;
			img = new Image;
			img.src = squid;
			ctx.drawImage(img, 0, 0, img.width / 4, img.height / 4);

			conn.sendText('test|' + canvas.toDataURL() )
		});

		// var iRealLen = buffer.Length - 54;
		// var image = new Buffer();


		// var iIndex = 0;
		// var iRowIndex = 0;
		// var iWidth = width * 4;
		// for (var i = height - 1; i >= 0; --i) {
		//     iRowIndex = i * iWidth;
		//     for (var j = 0; j < iWidth; j += 4)  {
		//         // RGB to BGR
		//         image[iIndex++] = buffer[iRowIndex + j + 2 + 54]; // B
		//         image[iIndex++] = buffer[iRowIndex + j + 1 + 54]; // G
		//         image[iIndex++] = buffer[iRowIndex + j + 54];     // R
		//         image[iIndex++] = buffer[iRowIndex + j + 3 + 54]; // A
		//     }   
		// }

		conn.sendBinary(buffer);

		// conn.sendText('test|' + buffer.toString('base64'));
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
}).listen(8008, function() {
	console.log('listen at port 8008')
})
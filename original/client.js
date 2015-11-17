//socket 客户端
var net = require('net');

var HOST = 'localhost';
var PORT = 8008;

var client = new net.Socket();
client.connect(PORT, HOST, function(err) {
    if(err)
       return console.log(err.message);

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
});

client.write("CONNECT{|}XXX", function(err) {
    client.write("CHAT{|}HEHE")
})


// 为客户端添加“data”事件处理函数
// data是服务器发回的数据
client.on('data', function(data) {

    console.log('DATA: ' + data);
    // 完全关闭连接
    //client.destroy();

});

// 为客户端添加“close”事件处理函数
client.on('close', function() {
    console.log('Connection closed');
});
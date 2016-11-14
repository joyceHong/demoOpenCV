// modules
var express = require('express')
  , http = require('http')
  , morgan = require('morgan');

//取得網頁檔案路徑的設定
var configServer = require('./config/pathDirectory'); 

// app parameters
var app = express();
app.set('port', configServer.httpPort); //取得網頁的port
app.use(express.static(configServer.staticFolder)); //取得網頁的路徑
app.use(morgan('dev'));//記錄日誌檔

console.log( configServer.staticFolder);
//呼叫 defautlPage的 serveIndex 函數
require('./config/defaultPage').serveIndex(app, configServer.staticFolder);

//呼叫 http 建立server
var server = http.createServer(app);
server.listen(app.get('port'), function () {
  console.log('HTTP server listening on port ' + app.get('port'));
});

//呼叫soket.io 模組 等待client連線,啟動人臉偵測
var io = require('socket.io')(server);
io.on('connection', require('./config/faceDetect'));

module.exports.app = app;
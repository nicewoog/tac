var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();

app.use(express.static(path.join(__dirname, 'assets/css')));
app.use(express.static(path.join(__dirname, 'assets/js')));
app.use(express.static(path.join(__dirname, 'assets/img')));

app.get('/index', function(req, res) {
  res.set('content-type','text/html');
  res.send(fs.readFileSync(__dirname+'/index.html','utf8'));
  res.end();
  console.log('execute');
});

app.get('/getContentAjax', function(req, res){
  var content = fs.readFileSync(__dirname+'/node.html','utf8')
  var sendData = {'nodeHtml':content}

  res.set('content-type','text/html');
  res.send(sendData);
  res.end();
  console.log('send some data for client request : ' + sendData);
})

app.get('*', function(req, res){
  res.send('잘못된 접근 혹은 정확하지 않은 url입니다.<br> /index로 접속해주세요.');
})

app.listen(3000);

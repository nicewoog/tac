var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();

var portNum = 6001;
var devKey = '8823f494-295a-494a-a563-544425c2a518';

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
});

app.post('/devAccess', function(req, res){
  var valEncrypt = {lol:Encrypt(devKey)};
  res.send(valEncrypt);
});

app.get('*', function(req, res){
  res.send('잘못된 접근 혹은 정확하지 않은 url입니다.<br> /index로 접속해주세요.');
})

app.listen(portNum);


function Encrypt(theText) {
    output = new String;
    Temp = new Array();
    Temp2 = new Array();
    TextSize = theText.length;
    for (i = 0; i < TextSize; i++) {
        rnd = Math.round(Math.random() * 122) + 68;
        Temp[i] = theText.charCodeAt(i) + rnd;
        Temp2[i] = rnd;
    }
    for (i = 0; i < TextSize; i++) {
        output += String.fromCharCode(Temp[i], Temp2[i]);
    }
    return output;
}
function unEncrypt(theText) {
    output = new String;
    Temp = new Array();
    Temp2 = new Array();
    TextSize = theText.length;
    for (i = 0; i < TextSize; i++) {
        Temp[i] = theText.charCodeAt(i);
        Temp2[i] = theText.charCodeAt(i + 1);
    }
    for (i = 0; i < TextSize; i = i+2) {
        output += String.fromCharCode(Temp[i] - Temp2[i]);
    }
    return output;
}

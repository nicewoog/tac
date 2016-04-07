var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();

app.get('/', function(req, res) {
  res.set('content-type','text/html');
  res.send(fs.readFileSync(__dirname+'/index.html','utf8'));
  res.end();
  console.log('execute');
});

app.listen(3000);

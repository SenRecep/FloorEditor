"use strict";

var express = require('express');

var app = express();

var path = require('path');

app.use(express["static"]('assets'));
app.get('/', function (req, res) {
  res.contentType('text/html');
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.listen(8080);
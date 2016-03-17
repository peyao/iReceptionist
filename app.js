var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();

global.__base = __dirname + '/';

app.use(logger('dev'));

app.use('/', express.static(__dirname + '/client/marketing'));
app.use('/app', express.static(__dirname + '/client/app'));
app.use('/vip', express.static(__dirname + '/client/vip'));
app.use('/auth', express.static(__dirname + '/client/auth'));
app.use('/checkin', express.static(__dirname + '/client/checkin'));

app.use('/assets', express.static(__dirname + '/client/assets'));
console.log(__dirname + '/client/assets');

app.use(function(req,res){
    res.status(404).sendFile(__dirname + '/client/404.html');
});

app.listen(process.env.PORT || 3000, function() {
    console.log('[iReceptionist Client listening on port process.env.PORT or 3000]');
});

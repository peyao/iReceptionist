//require('dotenv').config();

var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();

global.__base = __dirname + '/';

app.use(logger('dev'));

app.use('/', express.static(__dirname + '/client/marketing'));
app.use('/app', express.static(__dirname + '/client/app'));

app.listen(3000, function() {
    console.log('[iReceptionist Business Client listening on port 3000]');
});

//exports = module.exports = app;

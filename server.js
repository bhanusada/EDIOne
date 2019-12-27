/*jslint node: true */
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var request = require('request');
var router = require('./server/router');
var socketConnection = require('./server/socket-connection');
var http = require('http');
var config;
if (process.env.config) {
    config = JSON.parse(process.env.config);
} else {
    var configJson = require('./config/config.json');
    config = configJson.production ;
}

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());
app.use('/', express.static(__dirname + '/dist/'));
app.use('/db', router);

app.use(function(req, res, next) {
    var origin = req.headers.origin;
    if (origin && origin.includes('.homedepot.com')) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    }
    next();
});

/* Express Services */
var security = require('./server/security.js');
security(app, config);

app.get('/config', function(req, res) {
    res.json(config);
});

app.get('/refresh', function(req, res) {
    res.send({ 'users': usersCount});
})

app.all('*', function(req, res) {
    res.redirect('/');
});

app.use(express.static('./src/assets/css'))

var server = http.createServer(app);

socketConnection.socketConnection(server);

var port = process.env.PORT || 8080;

var webServer = server.listen(port, () => {
    console.log('Listening on port %d', webServer.address().port);
})

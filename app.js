let express = require('express');
let logger = require('morgan'); // Logging middleware module to log requests and responses on console.
let body_parser = require('body-parser'); // Module to parse JSON in requests to all APIs.
// let mongoose = require('mongoose');
let Promise = require('bluebird');


let app = express();
app.use(logger('dev'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With , token");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Access-Control-Expose-Headers", "token");
    next();
});

var routes = require('./routes');
app.use(routes);

module.exports = app;
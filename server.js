let app = require('./app');
let http = require('http');
let https = require('https');
let Promise = require('bluebird');
var mongoose = require('mongoose');


var url = "mongodb://127.0.0.1:27017/local";

var option = {
  promiseLibrary: Promise,
  useMongoClient: true,
}

mongoose.connect(url, option, function(err, db) {
  if (err) throw err;
  console.log("Database Connected!");
});
console.log('Mongoose connection status code:', mongoose.connection.readyState);


app.set('port', process.env.PORT || 8000);
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).send(err.stack);
});


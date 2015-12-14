'use strict';

let express = require('express');
let path = require('path');
let cors = require('cors');
let logger = require('morgan');
let request = require('request');
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let app = express();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const push_secret = process.env.PUSH_SECRET;

let mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/graffitiApp');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', (callback) => {
  console.log('Mongoose connected.');
});

let routes = require('./config/routes');
app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use('/', express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules'));
app.use('/', routes)
//enable cross-origin requests
app.all('*', function(req, res, next) {
  var responseSettings = {
    'AccessControlAllowOrigin': req.headers.origin,
    'AccessControlAllowHeaders': 'Content-Type,X-CSRF-Token,X-Requested-With,Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, X-File-Name',
    'AccessControlAllowMethods': 'POST, GET, PUT, DELETE, OPTIONS',
    'AccessControlAllowCredentials': true
  };

  res.header('Access-Control-Allow-Credentials', responseSettings.AccessControlAllowCredentials);
  res.header('Access-Control-Allow-Origin', responseSettings.AccessControlAllowOrigin);
  res.header('Access-Control-Allow-Headers', (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : 'x-requested-with');
  res.header('Access-Control-Allow-Methods', (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
}) //ends app.all

let server = app.listen(process.env.PORT || 3000, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('express running', host, port);
})

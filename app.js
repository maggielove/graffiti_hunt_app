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

let server = app.listen(process.env.PORT || 3000, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('express running', host, port);
})

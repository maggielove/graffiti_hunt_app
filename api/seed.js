'use strict';
let mongoose = require('mongoose');
let User = require('./models/user');
let Place = require('./models/place');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/graffitiApp');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', (callback) => {
  console.log('Mongoose connected.');
});

let usernames = [ 'jamesh', 'lilskips' ]

let passwords = [ 'password1', 'password2' ]

let jamesh = new User({
  username: usernames[0],
  password: passwords[0]
})

jamesh.save(function(err) {
  if (err) {
    console.log(err)
  } else {
    jamesh.save();
  }
})

let  lilskips = new User({
  username: usernames[1],
  password: passwords[1]
})

lilskips.save(function(err) {
  if (err) {
    console.log(err)
  } else {
    lilskips.save();
  }
})

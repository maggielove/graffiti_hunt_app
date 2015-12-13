'use strict';
let User = require('../models/user');
let request = require('request');
let jwt = require('jsonwebtoken');
let expressJwt = require('express-jwt');
let secret = process.env._SECRET;
let mongoose = require('mongoose');

//Authenticate
function authenticate(req, res){
  console.log('determining token status');
  User.findOne({
    username: req.body.user.username
  }, function(err, user) {
    if (err) throw err;
    if (user == undefined) {
      res.send({ success: false, message: 'Authentication failed. User not found.'});
    } else {
      user.authenticate(req.body.user.password, function(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return res.send({ message: 'Authentication successful! Token: ', token: jwt.sign(user, secret)})
        } else {
          return res.send({ message: 'Password not a match. Unable to provide token.'});
        }
      }); //ends .authenticate
    } //ends else
  }); //ends function(err, user)
} //ends authenticate

module.exports = {
  authenticate: authenticate
}

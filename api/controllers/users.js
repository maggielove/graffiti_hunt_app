'use strict';
let User = require('../models/user');
let request = require('request');
let jwt = require('jsonwebtoken');
let expressJwt = require('express-jwt');
let secret = process.env._SECRET;
let mongoose = require('mongoose');

//Authenticate
function authenticate(req, res){
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

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const push_secret = process.env.PUSH_SECRET;

// function redirect(req, res){
//   res.redirect('https://foursquare.com/oauth2/authenticate?client_id=' + client_id + '&response_type=code&redirect_uri=https://graffiti-hunt.herokuapp.com/')
// }

function getAccessToken(req, res){
  res.send({ access_token: access_token })
}

module.exports = {
  authenticate: authenticate,
  getAccessToken: getAccessToken,
  // redirect: redirect
}

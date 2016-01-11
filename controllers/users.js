'use strict';
let User = require('../models/user');
let request = require('request');
let jwt = require('jsonwebtoken');
let expressJwt = require('express-jwt');
let secret = process.env._SECRET;
let mongoose = require('mongoose');
var token;

//Authenticate
function authenticate(req, res){
  console.log('req.body.username: ' + req.body.username)
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;
    if (user == undefined) {
      res.send({ success: false, message: 'Authentication failed. User not found.'});
    } else {
      user.authenticate(req.body.password, function(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          token = jwt.sign(user, secret, {expiresIn: 144000});
          // save the token to the user in the database.
          user.token = token;
          return res.send({ message: 'Authentication successful! Token: ', token:token, user: user})
          // return res.send({ message: 'Authentication successful! Token: ', token: jwt.sign(user, secret), user: user})

          console.log('user.token: ' + user.token)
        } else {
          return res.send({ message: 'Password not a match. Unable to provide token.'});
        }
      }); //ends .authenticate
    } //ends else
  }); //ends function(err, user)
} //ends authenticate

function findCurrentUser(req, res){
  console.log('token: ', req.body.sessionToken);
  User.findOne({
    token: req.body.sessionToken
  }, function(err, user){
    if (err) throw err;
    if (user == undefined) {
      res.send({ success: false, message: 'User with sessionStorage token not found.'});
      //check: are sessionStorage tokens same every time? need to delete tokens fr db at log out?
    } else {
      if (user.token == req.body.sessionToken) {
        return res.send({message: 'Current user found!: ', user: user })
      }
     }
   })
  }

function test(){
  console.log('If you\'re reading this it should mean user has been granted token');
}

module.exports = {
  authenticate: authenticate,
  test: test,
  findCurrentUser: findCurrentUser
  // getAccessToken: getAccessToken
}

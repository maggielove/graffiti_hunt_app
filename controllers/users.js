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
          user.save(function(error) {
            if (error) res.json( {message: 'Error updating user: ' + error });
            // res.json( {message: 'User updated', user: user});
          })
          console.log('user.token: ' + user.token)
          return res.send({ message: 'Authentication successful! Token: ', token, user: user})
          // return res.send({ message: 'Authentication successful! Token: ', token: jwt.sign(user, secret), user: user})
        } else {
          return res.send({ message: 'Password not a match. Unable to provide token.'});
        }
      }); //ends .authenticate
    } //ends else
  }); //ends function(err, user)
} //ends authenticate

function findCurrentUser(req, res){
  console.log('token hash/back end: ', req.body);
  User.findOne({
    token: req.body.currentToken
  }, function(err, user){
    if (err) throw err;
    if (user == undefined) {
      res.send({ success: false, message: 'User with sessionStorage token not found.'});
      //check: are sessionStorage tokens same every time? need to delete tokens fr db at log out?
    } else {
      if (user.token == req.body.currentToken) {
        console.log('found user/db: ' + user);
        return res.send({message: 'Current user found!: ', user: user })
      }
     }
   })
  }

function updateUser(request, response) {
  let id = request.params.id;
  let placeId = request.body._id
  console.log('request.body shd be place id: ' + request.body._id);
  // Match the user in the database to the user whose token is currently being
  ///saved in session storage.
  User.findById({ _id: id}, function(error, user) {
    if (error) response.json( { message: 'Error finding user: ' + user});
    // When the user clicks 'add to my list of places', add the place Id to that
    ////user in the db.
    user.places.push(placeId);
    user.save(function(error) {
      if (error) response.json({ message: 'Error saving user: ' + error});
      response.json({ message: 'User updated', user: user});
    });
  });
};

// function test(){
//   console.log('If you\'re reading this it should mean user has been granted token');
// }

module.exports = {
  authenticate: authenticate,
  // test: test,
  findCurrentUser: findCurrentUser,
  updateUser: updateUser
  // getAccessToken: getAccessToken
}

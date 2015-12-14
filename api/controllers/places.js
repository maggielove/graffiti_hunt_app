'use strict';
var Place = require('../models/place');
var request = require('request');
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const push_secret = process.env.PUSH_SECRET;

//Get
function findAll(request, response) {
  Place.find(function(err, places) {
    if (err) response.json({ message: 'No places found.'});

    response.json( { places: places, client_id: client_id, client_secret: client_secret })
  });
};

//test
function getTest(request, response) {
  console.log('hit /test');
  console.log('process.env in the back-end: ' + process.env.CLIENT_ID);
}

module.exports = {
  findAll: findAll,
  getTest:getTest
}

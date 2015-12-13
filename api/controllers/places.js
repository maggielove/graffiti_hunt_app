'use strict';
var Place = require('../models/place');
var request = require('request');

//test
function getTest(request, response) {
  console.log('hit /test');
  console.log('process.env in the back-end: ' + process.env.CLIENT_ID);
}

module.exports = {
  getTest:getTest
}

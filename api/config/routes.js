'use strict';
let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
// const client_id = process.env.CLIENT_ID;
// const client_secret = process.env.CLIENT_SECRET;
// const push_secret = process.env.PUSH_SECRET;

let usersController = require('../controllers/users');
let placesController = require('../controllers/places');

router.route('/#/test')
  .get(placesController.getTest);

router.route('/users/authenticate')
  .post(usersController.authenticate)






module.exports = router;

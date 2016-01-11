'use strict';
let express = require('express');
let app = express();
let router = express.Router();
var jwt = require('jsonwebtoken');
let secret = process.env._SECRET;
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
var request = require('request');

let usersController = require('../controllers/users');
let placesController = require('../controllers/places');

router.route('/places')
  .get(placesController.findAll)
  // add a new place
  .post(placesController.insertPlace)

router.route('/places/:id')
  .get(placesController.showPlace)
  .put(placesController.updatePlace)

router.route('/users/authenticate')
  .post(usersController.authenticate)

router.route('/users/current')
  .post(usersController.findCurrentUser);

//Route middleware to verify protected token.
// If you get a response from client, verify token
router.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access'];

// decode token
if (token) {
  jwt.verify(token, secret, function(err, decoded) {
    if (err) {
      return res.json({ success: false, message: "Failed to authenticate token"});
    } else {
      req.decoded = decoded;
      next();
    }
  })
} else {
  return res.status(403).send({
    success: false,
    message: "No token!"
  })
 }
});

router.route('/test')
    .get(usersController.test);

module.exports = router;

'use strict';
let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const push_secret = process.env.PUSH_SECRET;
const code = 'foo' //req.query.code

let usersController = require('../controllers/users');
let placesController = require('../controllers/places');

router.route('/places')
  .get(placesController.findAll)

router.route('/#/test')
  .get(placesController.getTest);

router.route('/authtest')
  .get(usersController.redirect)


// router.route('https://foursquare.com/oauth2/authenticate?client_id=' + client_id + '&response_type=code&redirect_uri=https://graffiti-hunt.herokuapp.com/')

router.route('/users/authenticate')
  .post(usersController.authenticate)

// router.use(function(req, res, next) {
//   let code = req.query.code;
//   console.log('code: ' + code);
//   if (code) {
//     res.json({success: true, message: 'user accepted link to foursquare account'});
//     next();
//   }
//   else {
//     return res.status(403).send({
//       success: false,
//       message: 'No code provided.'
//     })
//   }
// })

///// ALL ROUTES BELOW THIS LINE SHOULD REQUIRE A CODE \\\\\
// router.route('https://graffiti-hunt.herokuapp.com/?code=CODE')

// connect user account to Foursquare
//exchange code variable for an access token.
// router.route('https://foursquare.com/oauth2/access_token?client_id=' + client_id + '&client_secret=' + client_secret + '&grant_type=authorization_code&redirect_uri=https://graffiti-hunt.herokuapp.com/&code=' + code)
//   .post(usersController.getAccessToken)







module.exports = router;

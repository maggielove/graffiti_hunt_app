'use strict';
let express = require('express');
let app = express();
let router = express.Router();
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const push_secret = process.env.PUSH_SECRET;
var code = ''; //req.query.code
var accessToken = '';
var request = require('request');

let usersController = require('../controllers/users');
let placesController = require('../controllers/places');

router.route('/places')
  .get(placesController.findAll)
  // add a place
  .post(placesController.insertPlace)

router.route('/places/:id')
  .get(placesController.showPlace)

// router.route('/authtest')
//   .get(usersController.redirect)


// router.route('https://foursquare.com/oauth2/authenticate?client_id=' + client_id + '&response_type=code&redirect_uri=https://graffiti-hunt.herokuapp.com/')

router.route('/users/authenticate')
  .post(usersController.authenticate)

router.use(function(req, res, next) {
  let code = req.query.code;
  console.log('code: ' + code);
  if (code) {
    usersController.getAccessToken();
    request('/getAccessToken');
    //res.json({success: true, message: 'user accepted link to foursquare account'});
    // user can now hit routes below (= routes restricted to users who have linked to Foursquare)
    next();
  }
  else {
    return res.status(403).send({
      success: false,
      message: 'No code provided.'
    })
  }
})

// router.route('/getToken', function(req, res, body) {
//   request('https://foursquare.com/oauth2/access_token?client_id=' + client_id + '&client_secret=' + client_secret + '&grant_type=authorization_code&redirect_uri=https://graffiti-hunt.herokuapp.com/&code=' + code, function(err, response, body) {
//     if(!err && response.statusCode == 200) {
//       console.log(body);
//       res.json(body);
//     }
//   })
// })

///// ALL ROUTES BELOW THIS LINE REQUIRE A CODE \\\\\

// for url with code, exchange code for access token
router.route('/?code=' + code + '#/index')
  .get(usersController.getAccessToken)

// Check in:
router.route('https://api.foursquare.com/v2/users/self/checkins?oauth_token=' + accessToken)

// app.get('https://foursquare.com/oauth2/access_token?client_id=' + client_id + '&client_secret=' + client_secret + '&grant_type=authorization_code&redirect_uri=https://graffiti-hunt.herokuapp.com/&code=' + code)

// send back code in line 33?

// router.route('https://graffiti-hunt.herokuapp.com/?code=' + code)

//exchange code variable for an access token.
// router.route('https://foursquare.com/oauth2/access_token?client_id=' + client_id + '&client_secret=' + client_secret + '&grant_type=authorization_code&redirect_uri=https://graffiti-hunt.herokuapp.com/&code=' + code)
  // .get(usersController.getAccessToken) //get?


module.exports = router;

'use strict';
var Place = require('../models/place');
var request = require('request');
// google
var key = process.env.GMAPS_KEY;
// foursquare
var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var push_secret = process.env.PUSH_SECRET;
//get the user's current location


//Get
function findAll(request, response) {
  Place.find(function(err, places) {
    if (err) response.json({ message: 'No places found.'});

    response.json( { places: places, client_id: client_id, client_secret: client_secret })
  });
};

function showPlace(request, response) {
  let id = request.params.id;
  Place.find( { _id: id}, function(error, place) {
    if (error) response.json({ message: 'Unable to find location.'});

    response.json({ place: place })
    console.log("place: " + place )
  })
}


function insertPlace(request, response) {
  console.log('request.body: ' + request.body)
  let place = new Place(request.body);
  // place.loc.push(lat);
  // place.loc.push(lng);

  place.save(function(error) {
    if (error) response.json( { message: 'Unable to add place due to error: ' + error });
    response.json({ place: place });
  });
}

function updatePlace(request, response) {
  let id = request.params.id;
  Place.findById({_id: id}, function(error, place){
    if(error) response.json({message: 'Error finding location: ' + error});
    if (request.body.name) place.name = request.body.name;
    if (request.body.address) place.address = request.body.address;
    if (request.body.city) place.city = request.body.city;
    if (request.body.zipcode) place.zipcode = request.body.zipcode;
    if (request.body.artInfo) place.artInfo = request.body.artInfo;
    place.save(function(error) {
      if (error) response.json({ message: 'Error saving location: ' + error });
      response.json({ message: 'Place updated', place: place});
    });
  });
};

module.exports = {
  findAll: findAll,
  showPlace: showPlace,
  insertPlace: insertPlace,
  updatePlace: updatePlace
}

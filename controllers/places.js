'use strict';
var Place = require('../models/place');
var request = require('request');
var currentUserPlaces = [];
// var filteredPlaces = [];
var foundUserPlaces = [];
// google
var key = process.env.GMAPS_KEY;



//Get
function findAll(request, response) {
  Place.find(function(err, places) {
    if (err) response.json({ message: 'No places found.'});

    response.json( { places: places })
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

function updateUserPlaces(request, response) {
  // filteredPlaces = [];
  currentUserPlaces = [];
  let userPlaceIdArray = request.body;
  // Loop through the array of place ids for the current user
  for (var i = 0; i < userPlaceIdArray.length; i++) {
    console.log('userPlaceId: ' + userPlaceIdArray[i]);
    Place.findById( {_id: userPlaceIdArray[i]}, function(error, place) {
      // {_id: "ObjectId(" + userPlaceIdArray[i] + ")" }
      if (error) response.json( { message: 'Error finding location: ' + error });
      if (place !== undefined) currentUserPlaces.push(place);
      // Filter is a native method of ES5--will leave only elements that pass the onlyUnique callback function
      // filteredPlaces = currentUserPlaces.filter(onlyUnique);
      return currentUserPlaces;
    })
    .then (function(data) {
      response.json( {currentUserPlaces: currentUserPlaces });
    })
  }
}

// Before adding a place id to a user's array of place ids, make sure it hasn't already been added.
// This function checks to see that the index of the value being added is the lowest index
// function onlyUnique(value, index, self){
//   return self.indexOf(value) === index;
// }

// Find current user's places, send back to front end
function returnUserPlaces(request, response){
  response.json({ currentUserPlaces: currentUserPlaces });
}

module.exports = {
  findAll: findAll,
  showPlace: showPlace,
  insertPlace: insertPlace,
  updatePlace: updatePlace,
  updateUserPlaces: updateUserPlaces,
  returnUserPlaces: returnUserPlaces
  // findAllUserPlaces: findAllUserPlaces
}

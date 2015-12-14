'use strict';
// const client_id = process.env.CLIENT_ID;
// const client_secret = process.env.CLIENT_SECRET;
// const push_secret = process.env.PUSH_SECRET;

angularApp
  .controller('PlacesController', PlacesController);

PlacesController.$inject = ['$http'];

function PlacesController($http){
  let self = this;
  self.all = [];
  self.single = {};
  self.client_id = '';
  self.client_secret = '';
  self.getPlaces = getPlaces;
  self.viewPlace = viewPlace;

  getPlaces();
  function getPlaces(){
    $http
      ////note: WILL HAVE TO CHANGE THIS TO MATCH HEROKU ROUTES
      .get('http://localhost:3000/places')
      .then(function(response) {
        self.all = response.data.places;
        self.client_id = response.data.client_id;
        self.client_secret = response.data.client_secret;
        // self.client_id
        //self.client_secret
      })
  }

  // let venueId = $('.listed-locations').id
  function viewPlace(place) {
    $http
    .get('https://api.foursquare.com/v2/venues/' + place.venueId + '?client_id=' + self.client_id + '&client_secret=' + self.client_secret + '&v=20151213')
    .then(function(response){
      self.single = response.response.venue;
    })
  }
}

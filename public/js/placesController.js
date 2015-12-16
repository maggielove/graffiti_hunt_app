'use strict';

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
  self.addPlace = addPlace;
  self.newPlace = { loc: [0, 0] };
  self.lat = lat;
  self.lng = lng;
  // self.checkIn = checkIn;

  var lat = 0;
  var lng = 0;
  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.watchPosition(showPosition);
      } else {
          x.innerHTML = "Geolocation is not supported by this browser.";
      }
  }
  function showPosition(position) {
      lat = position.coords.latitude;
      lng = position.coords.longitude;
      x.innerHTML = lat + ',' + lng;
  }
  getLocation();

  getPlaces();
  function getPlaces(){
    $http
      ////note: WILL HAVE TO CHANGE THIS TO MATCH HEROKU ROUTES
      .get('/places')
      .then(function(response) {
        self.all = response.data.places;
        self.client_id = response.data.client_id;
        self.client_secret = response.data.client_secret;
        // return "single=true"
        // self.client_id
        //self.client_secret
      })
  }

  // let venueId = $('.listed-locations').id
  function viewPlace(place) {
    $http
    .get('/places/' + place._id)
    // .get('https://api.foursquare.com/v2/venues/' + place.venueId + '?client_id=' + self.client_id + '&client_secret=' + self.client_secret + '&v=20151213')
    .then(function(response){
      console.log(response);
      self.single = response.data.place[0];
      // self.single = response.data.response.venue;
    })
  };

  function addPlace() {
    console.log('lat: ' + lat + 'long: ' + lng);
    console.log('adding new place');
    self.newPlace.loc[0] = lat;
    self.newPlace.loc[1] = lng;
    $http
    .post('/places', self.newPlace)
    .then(function(response){
      getPlaces();
    });
  }

  // function checkIn(place) {
  //   console.log('clicked check in button')
  //   $http({
  //     url : 'https://foursquare.com/oauth2/authenticate?client_id=' + self.client_id + '&response_type=token&redirect_uri=https://graffiti-hunt.herokuapp.com/',
  //     method: 'GET',
  //     withCredentials: true
  //   })
  // }
}

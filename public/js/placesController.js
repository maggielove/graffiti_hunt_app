'use strict';

function initialize() {
var myLatLng = {lat: 40.7401398, lng: -73.9896869};

var mapProp = {
  center:new google.maps.LatLng(40.7401398, -73.9896869),
  zoom:12,
  mapTypeId:google.maps.MapTypeId.ROADMAP
};
var map=new google.maps.Map(document.getElementById("map-canvas"), mapProp);

var marker = new google.maps.Marker({
  position: myLatLng,
  map: map,
  title: 'Hello World!'
});
}

google.maps.event.addDomListener(window, 'load', initialize);

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
          navigator.geolocation.watchPosition(getPosition);
      } else {
          console.log("Geolocation is not supported by this browser.");
      }
  }
  function getPosition(position) {
      lat = position.coords.latitude;
      lng = position.coords.longitude;
  }
  getLocation();

  // function addMarker() {
  //   var map = document.getElementById('googleMap')
  //   var myLatLng = { lat: lat, lng: lng }
  //   var marker = new google.maps.Marker({
  //     position: myLatLng,
  //     map: map,
  //     title: 'Hello World!'
  //   });
  // }

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
    // addMarker();
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

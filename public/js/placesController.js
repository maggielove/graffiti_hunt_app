'use strict';


console.log('PlacesController.all: ' + PlacesController.all)

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
  self.initialize = initialize;
  self.lat = lat;
  self.lng = lng;
  // self.checkIn = checkIn;

  // get the user's location when they add a new street art location to the map.
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

  getPlaces();
  function getPlaces(){
    $http
      ////note: WILL HAVE TO CHANGE THIS TO MATCH HEROKU ROUTES
      .get('/places')
      .then(function(response) {
        self.all = response.data.places;
        console.log('self.all inside getPlaces():' + self.all);
        self.client_id = response.data.client_id;
        self.client_secret = response.data.client_secret;
        // do not run google maps initialize() until places have loaded.
        initialize();
        // return "single=true"
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
      // Foursquare API info:
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

  console.log('self.all outside Google Map fn: ', self.all);

  ///GOOGLE MAP & MARKER JS START ///
  function initialize() {

    var mapProp = {
      // change center to bounds
      center:new google.maps.LatLng(40.7401398, -73.9896869),
      zoom:12,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map=new google.maps.Map(document.getElementById("map-canvas"), mapProp);

    // var markers = [
    //   ['GA', 40.7401398, -73.9896869]
    // ]
    // set markers for every street art location in the app's db
    var markers = [];
    console.log('self.all inside gmap fn: ', self.all);
    var name;
    var lat;
    var lng;
    // loop through the locations and add information from each to the markers array.
    for(i = 0; i < self.all.length; i++) {
      console.log('i: ', i);
      var singleMarker = [];
      // var singleMarker = ['GA', 40.7401398, -73.9896869];
      name = self.all[i].name;
      lat = self.all[i].loc[0];
      lng = self.all[i].loc[1];
      singleMarker.push(name, lat, lng);
    //   console.log(singleMarker);
      markers.push(singleMarker);
    }
    console.log('markers: ' + markers)

    // show multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i

    // loop through all markers and put each one on the map.
    for( i = 0; i < markers.length; i++) {
      var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
      // bounds.extend(position);
      marker = new google.maps.Marker({
        position: position,
        map: map,
        title: markers[i][0]
      })

      // add event listener for info windows

      // map.fitBounds(bounds)
    }
  }

  ///GOOGLE MAP & MARKER JS END ///

  // Foursquare
  // function checkIn(place) {
  //   console.log('clicked check in button')
  //   $http({
  //     url : 'https://foursquare.com/oauth2/authenticate?client_id=' + self.client_id + '&response_type=token&redirect_uri=https://graffiti-hunt.herokuapp.com/',
  //     method: 'GET',
  //     withCredentials: true
  //   })
  // }
}

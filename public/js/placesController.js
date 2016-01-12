'use strict';

function PlacesController(findUserService, $http){
  let self = this;
  self.all = [];
  // self.currentUserId = currentUserId;
  self.single = {};
  self.editedPlace = {};
  self.client_id = '';
  self.client_secret = '';
  self.currentUserId = '';
  self.getPlaces = getPlaces;
  self.viewPlace = viewPlace;
  self.addPlace = addPlace;
  self.newPlace = { loc: [0, 0] };
  self.editPlace = editPlace;
  self.initialize = initialize;
  self.lat = lat;
  self.lng = lng;
  self.markPlaceVisited = markPlaceVisited;
  self.display = false;
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

  function viewPlace(place) {
    // var single = false;
    $http
    .get('/places/' + place._id)
    .then(function(response){
      console.log(response);
      self.single = response.data.place[0];
      // single === true;
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

  function editPlace(place){
    $http
    .put('/places/' + self.single._id, self.single)
    .then(function(response) {
      getPlaces();
    })
  }

  function markPlaceVisited(place){
    findUserService.getCurrentUser()
      .then(function(data){
        console.log('result of service in markPlaceVisited: ' + data);
        return self.currentUserId = data;
        console.log(self.currentUserId);
        // return self.currentUserId;
      })
      console.log('currentUserId: ' + self.currentUserId);
      // $http
      // .put('/users/' + currentUserId)
      // .then(function(response) {
      //   // add a var to service that returns a user's list of place ids...
      // })

    // back end? .post .then get user's places
    // currentUser.places.push(self.single._id);
  }
  console.log(self.currentUserId);

  ///GOOGLE MAP & MARKER JS START ///
  function initialize() {

    var mapProp = {
      // change center to bounds
      center:new google.maps.LatLng(40.7401398, -73.9896869),
      zoom:12,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map=new google.maps.Map(document.getElementById("map-canvas"), mapProp);

    // set markers for every street art location in the app's db
    var markers = [];
    // console.log('self.all inside gmap fn: ', self.all);
    var name;
    var lat;
    var lng;
    // loop through the places in db and add information from each to the markers array.
    for(i = 0; i < self.all.length; i++) {
      // console.log('i: ', i);
      var singleMarker = [];
      name = self.all[i].name;
      lat = self.all[i].loc[0];
      lng = self.all[i].loc[1];
      // push the info for a single marker into an individual array
      singleMarker.push(name, lat, lng);
      markers.push(singleMarker);
    }
    console.log('markers: ' + markers)

    //set content for the info window of each marker
    var infoWindowContent = [];
    var name;
    // var address;
    // loop through all places in db and add its name, address to an info window
    for (i = 0; i < self.all.length; i++){
      var singleInfoWindow = [];
      name = '<div><h3>' + self.all[i].name + '</h3></div>';
      // if (self.all[i].address == !undefined)  {
      //   address = '<div><p>' + self.all[i].address  + '</div></p>';
      // };
      singleInfoWindow.push(name);
      // singleInfoWindow.push(name + address);
      infoWindowContent.push(singleInfoWindow);
    }
    console.log('infoWindow array: ' + infoWindowContent)

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

      // On click, each marker will display its info window
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infoWindow.setContent(infoWindowContent[i][0]);
          infoWindow.open(map, marker);
        }
      })(marker, i));

      // map.fitBounds(bounds)
    }
  }

  ///GOOGLE MAP & MARKER JS END ///

} // ends PlacesController function

angularApp.service('findUserService', function($window, $http){
      // currentUser is a private variable
      var currentUser = '';
      // the function that will retrieve user information from the backend
      this.currentUserCall;
      this.sessionToken = { currentToken: '' };

      this.getCurrentUser = function(){
        // get the sessionToken from window session storage
        this.sessionToken.currentToken = $window.sessionStorage.getItem('token');
        console.log('sessionToken in service function: ' + this.sessionToken.currentToken);
        this.currentUserCall =
        $http
        // Send the session token to the back end, where it can be matched with
        /// the token of a user in the db.
        .post('/users/current', this.sessionToken)
        .then(function(response){
          currentUser = response.data.user._id;
          console.log('currentUser: ' + currentUser);
          return currentUser;
        })
        // Return the function of currentUserCall so that the data (returned currentUser)
        /// is available to the places controller, above.
        return this.currentUserCall;
      } // end service
    })

PlacesController.$inject = ['findUserService', '$http'];

angularApp
  .controller('PlacesController', PlacesController);

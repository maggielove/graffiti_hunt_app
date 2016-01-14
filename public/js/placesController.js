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
  self.addPlaceToUser = addPlaceToUser;
  self.userPlaceIds = {};
  self.userPlaces = [];
  // self.getUserPlaces = getUserPlaces;
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

  //for logged-in user:
  // getUserPlaces();

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
        self.currentUserId = data;
        return self.currentUserId;
      })
      // Once you have the current user id, call function that will add location
      //... to the user's account
      .then(function(data) {
        addPlaceToUser();
        // console.log('currentUserId: ' + self.currentUserId)
      });
  }

  function addPlaceToUser(place) {
    $http
    .put('/users/' + self.currentUserId, self.single)
    .then(function(response) {
      // When user information is sent back from the database, capture the place ids.
      self.userPlaceIds = response.data.user.places;
      $http
      .post('/users/' + self.currentUserId + '/places', self.userPlaceIds)
      .then(function(response) {
        self.userPlaces = response.data.currentUserPlaces;
        console.log('sample name fr array of place hashes: ' + response.data.currentUserPlaces[0].name);
        console.log(self.userPlaces[0].name);
      })
    })
  }

  ///GOOGLE MAP & MARKER JS START ///
  function initialize() {
    //styles are from 'Candy Colours' template on snazzymaps.com
    var styles = [
      {
        "featureType": "landscape",
        "stylers": [
            {
                "hue": "#FFE100"
            },
            {
                "saturation": 34.48275862068968
            },
            {
                "lightness": -1.490196078431353
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "road.highway",
        "stylers": [
            {
                "hue": "#FF009A"
            },
            {
                "saturation": -2.970297029703005
            },
            {
                "lightness": -17.815686274509815
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "stylers": [
            {
                "hue": "#FFE100"
            },
            {
                "saturation": 8.600000000000009
            },
            {
                "lightness": -4.400000000000006
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "hue": "#00C3FF"
            },
            {
                "saturation": 29.31034482758622
            },
            {
                "lightness": -38.980392156862735
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "hue": "#0078FF"
            },
            {
                "saturation": 0
            },
            {
                "lightness": 0
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "hue": "#00FF19"
            },
            {
                "saturation": -30.526315789473685
            },
            {
                "lightness": -22.509803921568633
            },
            {
                "gamma": 1
            }
        ]
      }
    ];

    var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

    var mapProp = {
      // change center to bounds
      center:new google.maps.LatLng(40.7401398, -73.9896869),
      zoom:12,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
      }
    };
    var map=new google.maps.Map(document.getElementById("map-canvas"), mapProp);

    // Associate styled map with MapTypeId, set it to display.
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

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
      var userPlaceReferences = '';
      var userPlaceObjects = '';
      // the function that will retrieve user information from the backend
      this.currentUserCall;
      this.userPlacesCall;
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
      } //end getCurrentUser

      console.log('floating currentUserId inside service: ' + currentUser);

      this.getUserPlaces = function(data){
        this.userPlacesCall =
        $http
          .get('/users/' + currentUser)
          .then(function(response) {
            userPlaceReferences = response.data.user.places;
            $http
            // instead of pushing ids into the array (= adds repeats of location at log-in), make a new function in places controller that finds
            /////each id in the array we're sending to the back end and sends back those places.
            .post('/users/' + self.currentUserId + '/places', userPlaceReferences)
            // The response is an array of place hashes based on user place ids
            .then(function(response) {
              userPlaceObjects  = response.data.foundUserPlaces;
              console.log('userPlaceObjects: ' + userPlaceObjects);
              return userPlaceObjects;
            })
         return this.userPlacesCall;
        })
      } // ends this.userPlacesCall
    })

    //To test, inject service in usersController, add it as a param to controller,
    //////====> etc., then put this after successful login in usersController.
    ////===> Run service.getCurrentUser().then(function(data) service.getUserPlaces();

    // function getUserPlaces() {
    //   // findUserService.getCurrentUser()
    //   //
    //   //   .then(function(data){
    //   //     self.currentUserId = data;
    //   //     return self.currentUserId;
    //   //   })
    //
    //     .then(function(data){
    //       $http
    //         .get('/users/' + self.currentUserId)
    //         .then(function(response) {
    //
    //           self.userPlaceIds = response.data.user.places;
    //           $http
    //           .post('/users/' + self.currentUserId + '/places', self.userPlaceIds)
    //           .then(function(response) {
    //             self.userPlaces = response.data.currentUserPlaces;
    //           })
    //       })
    //     })
    //     // console.log('currentUserId on page load: ' + self.currentUserId);
    // }

PlacesController.$inject = ['findUserService', '$http'];

angularApp
  .controller('PlacesController', PlacesController);

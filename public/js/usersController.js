'use strict';
angularApp
  .controller('UsersController', UsersController);

UsersController.$inject = ['findUserService', '$http', '$window', '$q'];

function UsersController(findUserService, $http, $window, $q){
  let self = this;
  self.loginUser = loginUser;
  self.getMyPlaces = getMyPlaces;
  self.test = test;
  self.single = {};
  self.verified = {};
  self.token;
  self.currentUserId = '';
  self.myPlaceIds = [];
  self.myPlaces = [];

  getMyPlaces();
  console.log(self.myPlaces);

  function loginUser(){
    var token;
    var verified;
    $http
    .post('/users/authenticate', self.single)
    .then(function(response){
      console.log('user.token after token save: ' + response.data.user.token)
      self.verified = response.data.user;
      if (response.data.token) {
        alert("You are now logged in.");
        self.token = response.data.token;
        $window.sessionStorage.token = response.data.token;
        console.log('self.token: ', self.token);
        getMyPlaces();
        // return verified = true;
        // !"guest";
      } else {
        alert("Username or password not a match. Please try again.");
        return verified = false;
      }
      // console.log('verified var: ', verified);
      // console.log(response)
    })
  } //ends log in user function

  function getMyPlaces(){
    $http
    .get('/users/5697c1580d9c33fb3ffd8f9a/places')
    .then(function(response){
      self.myPlaces = response.data.currentUserPlaces;
      console.log(self.myPlaces);
    })

    // findUserService.getCurrentUser()
    // .then(function(data){
    //   self.currentUserId = data;
    //   console.log(self.currentUserId);
    //   return self.currentUserId;
    // })
    // .then(function(data){
    //   $http
    //   .get('/users/' + self.currentUserId)
    //   .then(function(response){
    //     self.myPlaceIds = response.data.user.places;
    //     console.log(self.myPlaceIds);
    //     $http
    //     .post('/users/' + self.currentUserId + '/places', self.myPlacesIds)
    //     .then(function(response){
    //       self.myPlaces = response.data.currentUserPlaces;
    //       console.log(self.myPlaces);
    //     })
    //   })
    // })
  }

  function test() {
    console.log('clicked test button');
    console.log('self.token: ' + self.token);
    console.log('current user ' + self.verified.username);
    $http({
      url: "/test",
      method: "GET",
      headers: {
        'x-access': self.token,
        'current-user': self.verified
      }
    })
  }

} //ends UsersController

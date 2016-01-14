'use strict';
angularApp
  .controller('UsersController', UsersController);

UsersController.$inject = ['findUserService', '$http', '$window', '$q'];

function UsersController(findUserService, $http, $window, $q){
  let self = this;
  self.loginUser = loginUser;
  self.setCurrentUser = setCurrentUser;
  self.retrieveMyPlaces = retrieveMyPlaces;
  self.test = test;
  self.single = {};
  self.verified = {};
  self.token;
  self.currentUser = {};
  self.myPlaceIds = [];
  self.myPlaces = [];

  setCurrentUser();
  console.log('self.myPlaces outside a function: ' + self.myPlaces);

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
        // return verified = true;
        // !"guest";
      } else {
        alert("Username or password not a match. Please try again.");
        return verified = false;
      }
      // console.log('verified var: ', verified);
      // console.log(response)
    }).then(function(data){
      setCurrentUser();
    })
  } //ends log in user function

  console.log(self.currentUserId);

  function setCurrentUser(){
    findUserService.getCurrentUser()
    .then(function(data){
      self.currentUser = data;
      console.log(self.currentUser);
      return self.currentUser;
    })
    .then(function(data){
      retrieveMyPlaces()
    })
  }

    function retrieveMyPlaces(){
      $http
      .get('/users/' + self.currentUser._id + '/places')      .then(function(response){
        self.myPlaces = response.data.currentUserPlaces;
        console.log(self.myPlaces);
        return self.myPlaces;
      })
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

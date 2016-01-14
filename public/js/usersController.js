'use strict';
angularApp
  .controller('UsersController', UsersController);

UsersController.$inject = ['findUserService', '$http', '$window'];

function UsersController(findUserService, $http, $window){
  let self = this;
  self.loginUser = loginUser;
  self.test = test;
  self.single = {};
  self.verified = {};
  self.token;
  self.myPlaces = [];

  function loginUser(){
    var token;
    var verified;
    $http
    .post('/users/authenticate', self.single)
    .then(function(response){
      console.log('user.token after token save: ' + response.data.user.token)
      self.verified = response.data.user;
      if (response.data.token) {
        // $(#login-form).hide();
        alert("You are now logged in.");
        self.token = response.data.token;
        $window.sessionStorage.token = response.data.token;
        console.log('self.token: ', self.token);
        // Here, use a service that will retrieve all of a user's places to display in "My Places"
        findUserService.getCurrentUser()
        .then(function(data) {
          findUserService.getUserPlaces()
          .then(function(data) {
            self.myPlaces = data;
            return self.myPlaces;
          })
        })
        // userPlaceObjects
        return verified = true;
        // !"guest";
      } else {
        alert("Username or password not a match. Please try again.");
        return verified = false;
      }
      // console.log('verified var: ', verified);
      // console.log(response)
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

// angularApp.service('logInUser', function(){
//   this.single = {};
//   this.authUser = function(){
//     var token;
//     var verified;
//     $http
//     .post('/users/authenticate', self.single)
//     .then(function(response){
//       console.log('user.token after token save: ' + response.data.user.token)
//       self.verified = response.data.user;
//     }
//   })
// }

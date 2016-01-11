'use strict';
angularApp
  .controller('UsersController', UsersController);

// consider moving this to diff. file
angularApp.service('currentUserFactory',  function($window){
    var currentUser;
    var sessionToken;

    // maybe $http should be above..
    this.getCurrentUser = function($http){
      sessionToken = $window.sessionStorage.getItem('token');
      $http
      .post('/users/current', sessionToken)
      .then(function(response){
        currentUser = response.data.user;
      })
      return currentUser;
    }

    // Test this by trying it on places controller.

      // END OF FACTORY FUNCTION. THEN PASS THIS TO PLACES CONTROLLER TO ADD TO USER's LIST OF PLACES.
      // Get id of location being added.
      // insert id of that location into user's list of locations.
  });

UsersController.$inject = ['$http', '$window'];

// UsersController.$inject = ['$window'];

function UsersController($http, $window){
  let self = this;
  self.loginUser = loginUser;
  self.test = test;
  self.single = {};
  self.verified = {};
  self.token;

  function loginUser(){
    var token;
    var verified;
    $http
    .post('/users/authenticate', self.single)
    .then(function(response){
      console.log('user before token save: ' + response.data.user)
      self.verified = response.data.user;
      if (response.data.token) {
        // $(#login-form).hide();
        alert("login successful");
        self.token = response.data.token;
        $window.sessionStorage.token = response.data.token;
        console.log('response.data.user.username: ' + response.data.user.username);
        console.log('self.token: ', self.token);
        console.log('$windowSessionStorage.token: ' + window.sessionStorage.token);
        return verified = true;
        // !"guest";
      } else {
        alert("Login not successful. Please try again.");
        return verified = false;
      }
      // console.log('verified var: ', verified);
      // console.log(response)
      // console.log('user after token save: ' + response.data.user.username)
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


}

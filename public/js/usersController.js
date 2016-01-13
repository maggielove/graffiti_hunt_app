'use strict';
angularApp
  .controller('UsersController', UsersController);

UsersController.$inject = ['$http', '$window'];

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
      console.log('user.token after token save: ' + response.data.user.token)
      self.verified = response.data.user;
      if (response.data.token) {
        // $(#login-form).hide();
        alert("login successful");
        // Here, use a service that will retrieve all of a user's places to display in "My Places"
        //// ==> will then need to return a var in service that can be passed to PlacesController
        self.token = response.data.token;
        $window.sessionStorage.token = response.data.token;
        console.log('self.token: ', self.token);
        return verified = true;
        // !"guest";
      } else {
        alert("Login not successful. Please try again.");
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


}

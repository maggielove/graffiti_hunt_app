'use strict';
angularApp
  .controller('UsersController', UsersController);

UsersController.$inject = ['$http'];

function UsersController($http){
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
        console.log('response.data.user.username: ' + response.data.user.username);
        console.log('self.token: ', self.token);
        // $http.headers =
        //   {'x-access': token};
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
    $http({
      url: "/test",
      method: "GET",
      headers: {
        'x-access': self.token
      }
    })
  }


}

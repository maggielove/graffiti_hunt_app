'use strict';
angularApp
  .controller('UsersController', UsersController);

UsersController.$inject = ['$http'];

function UsersController($http){
  let self = this;
  self.loginUser = loginUser;
  self.single = {};
  self.verified = {};

  // self.reroute = reroute;

  function loginUser(){
    var total = 0;
    var verified = true;
    $http
    .post('/users/authenticate', self.single)
    .then(function(response){
      console.log('user before token save: ' + response.data.user)
      self.verified = response.data.user;
      if (response.data.user != undefined) {
        console.log('response.data.user.username: ' + response.data.user.username + verified);
        return verified = true;
        // !"guest";
      } else {
        return verified = false;
      }
      console.log(total);
      // console.log(response)
      // console.log('user after token save: ' + response.data.user.username)
    })
  console.log('verified var: ', verified)
  }

  // function reroute(){
  //   $http
  //     .get('http://localhost:3000/authtest')
  // }
}

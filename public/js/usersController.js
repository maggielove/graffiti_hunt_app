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
    console.log('in usersController');
    $http
    .post('/users/authenticate', self.single)
    .then(function(response){
      self.verified = response.data.user;
      if (response.data.user) {
        console.log(response.data.user);
        "guest" === false;
      }
      console.log(response)
    })
  }

  // function reroute(){
  //   $http
  //     .get('http://localhost:3000/authtest')
  // }
}

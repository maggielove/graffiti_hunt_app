'use strict';

angularApp
  .controller('UsersController', UsersController);

UsersController.$inject = ['$http'];

function UsersController($http){
  let self = this;
  // self.reroute = reroute;

  function loginUser(){
    console.log('in usersController');
    $http
    .post('/users/authenticate')
  }

  // function reroute(){
  //   $http
  //     .get('http://localhost:3000/authtest')
  // }
}

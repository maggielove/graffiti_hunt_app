$(function(){
         var token;
         $('#login').on('click', function(e){
           e.preventDefault();
           $.post("http://localhost:8000/api/authenticate", {name: $('#name').val(), password: $('#password').val()},
         function(data){
           if(data.token){
             $('#login').hide();
             alert("login successful " + data.token);
             token = data.token;
             $.ajaxSetup({
               headers: {'x-access': token}
             });
           }
         })
         });
         $('#users-list').on('click', function(e){
           e.preventDefault();

           $.ajax({
            //  data: {token: token},
             url: 'http://localhost:8000/api/users',
             type: 'GET',
             success: function(data){
               for(var i in data){
                 $('#users').append('<li>' +data[i] +'</li>');
               }
             }
           });
        });
      });

// checking params of .then stuff....
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

// CUT: lines 25-31 in users controller.
  // var promiseA = findUserService.getCurrentUser();
  // var promiseB = promiseA.then(function(result) {
  //   findUserService.getUserPlaces();
  // });
  // var promiseC = promiseB.then(function(result){
  //   self.myPlaces = result;
  //   console.log(self.myPlaces);

// CUT AT L. 33
// Here, use a service that will retrieve all of a user's places to display in "My Places"

// .then(function(data) {
//   findUserService.getUserPlaces();
//   self.myPlaces = data;
//   console.log(self.myPlaces);
// })
// .then(function(customPlaceObjects){
//   self.myPlaces = customPlaceObjects;
//   console.log(self.myPlaces);
//   return self.myPlaces;
// });

// userPlaceObjects


// CUT fr UsersController (outside it), l. 81
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

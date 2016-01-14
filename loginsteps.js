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

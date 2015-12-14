'use strict';
// const client_id = process.env.CLIENT_ID;
// const client_secret = process.env.CLIENT_SECRET;
// const push_secret = process.env.PUSH_SECRET;

angularApp
  .controller('PlacesController', PlacesController);

PlacesController.$inject = ['$http'];

function PlacesController($http){
  let self = this;
  self.getPlace = getPlace;

  // let venueId = $('.listed-locations').id
  function getPlace() {
    $http
      .get('https://api.foursquare.com/v2/venues/' + place.id + '?client_id=' + client_id + '&client_secret=' + client_secret + '&v=20151213')
  }
}

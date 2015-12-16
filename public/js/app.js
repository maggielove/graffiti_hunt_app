// var UsersController = ('./usersController')
// var PlacesController = ('./placesController')
var angularApp = angular.module('graffitiApp', ['ui.router'])

angularApp.config(PlaceRouter);

function PlaceRouter($stateProvider, $urlRouterProvider) {
  // for cross-domain requests (requests to Foursquare/oauth)

  $urlRouterProvider.otherwise("/");

  $stateProvider
  .state('index', {
    // $stateProvider.defaults.useXDomain = true;
    // $urlRouterProvider.defaults.useXDomain = true;
    url: '/',
    views: {
      '': {
      templateUrl: 'list.html'
      }
    }
  })
  .state('new', {
      url: '/places',
      templateUrl: 'new.html'
    })

}

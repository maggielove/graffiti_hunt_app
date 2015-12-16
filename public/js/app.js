// var UsersController = ('./usersController')
// var PlacesController = ('./placesController')
var angularApp = angular.module('graffitiApp', ['ui.router'])

angularApp.config(PlaceRouter);

function PlaceRouter($stateProvider, $urlRouterProvider) {
  // for cross-domain requests (requests to Foursquare/oauth)

  $urlRouterProvider.otherwise("/index");

  $stateProvider
  .state('index',
    {
    // $stateProvider.defaults.useXDomain = true;
    // $urlRouterProvider.defaults.useXDomain = true;
    url: '/',
    views: {
      '': {
      templateUrl: 'list.html'
    },
    'login@index': {
      url: '/',
      templateUrl: 'login.html'
    }
   }
  })
  .state('form', {
    url: '/form',
    templateUrl: 'form.html'
  })
  //states nested in form
  .state('form.new', {
    url: '/new',
    templateUrl: 'form-new.html'
  })
  .state('form.edit', {
    url: '/edit',
    templateUrl: 'form-edit.html'
  })
}

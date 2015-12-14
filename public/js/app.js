var angularApp = angular.module('graffitiApp', ['ui.router'])

angularApp.config(PlaceRouter);

function PlaceRouter($stateProvider, $urlRouterProvider) {
  // for cross-doman requests (requests to Foursquare/oauth)

  $urlRouterProvider.otherwise("/index");

  $stateProvider
  .state('index', {
    // $stateProvider.defaults.useXDomain = true;
    // $urlRouterProvider.defaults.useXDomain = true;
    url: '/',
    templateUrl: 'list.html'
  })
  .state('test', {
    url: '/authtest',
    templateUrl: 'test.html'
  })
}

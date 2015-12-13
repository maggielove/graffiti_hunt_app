var angularApp = angular.module('graffitiApp', ['ui.router'])

angularApp.config(PlaceRouter);

function PlaceRouter($stateProvider, $urlRouteProvider) {
  $urlRouteProvider.otherwise("/index");

  $stateProvider
  .state('index', {
    url: '/',
    templateUrl: 'list.html'
  })
  .state('test', {
    url: '/authtest',
    templateUrl: 'test.html'
  })
}

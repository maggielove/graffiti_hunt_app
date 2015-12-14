var angularApp = angular.module('graffitiApp', ['ui.router'])

angularApp.config(PlaceRouter);

function PlaceRouter($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

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

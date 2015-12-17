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
      'places': {
      templateUrl: 'list.html'
      }
    }
  })
  // separate the single place view from the list.
  // .state('index.single', {
  //   // $stateProvider.defaults.useXDomain = true;
  //   // $urlRouterProvider.defaults.useXDomain = true;
  //   url: 'single',
  //   views: {
  //     'places': {
  //     templateUrl: 'list.single.html'
  //     }
  //   }
  // })
  .state('new', {
      url: '/places',
      views: {
        'places' : {
          templateUrl: 'new.html'
        }
      }
    })
  .state('login', {
    url: '/users/authenticate',
    views: {
      'users' : {
        templateUrl: 'login.html'
      }
    }
  })
  .state('edit', {
    url: '/places/:id',
    views: {
      'places' : {
        templateUrl: 'edit.html'
      }
    }
  })

}

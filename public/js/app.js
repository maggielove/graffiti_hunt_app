// var UsersController = ('./usersController')
// var PlacesController = ('./placesController')
var angularApp = angular.module('graffitiApp', ['ui.router'])

angularApp.config(PlaceRouter);

function PlaceRouter($stateProvider, $urlRouterProvider) {
  // for cross-domain requests (requests to Foursquare/oauth)

  $urlRouterProvider.otherwise("/");

  $stateProvider
  .state('index', {
    url: '/',
    views: {
      'places': {
      templateUrl: 'list.html'
    },
    'users' : {
      templateUrl: 'login.html'
    }
    }
  })
  // .state('index.login', {
  //   url: 'users/authenticate',
  //   controller: 'users',
  //   views: {
  //     'users' : {
  //       templateUrl: 'list.login.html'
  //     }
  //   }
  // })
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
        },
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
      },
      'users' : {
        templateUrl: 'login.html'
      }
    }
  })

}

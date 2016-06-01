'use strict';

/**
 * @ngdoc overview
 * @name onforteApp
 * @description
 * # onforteApp
 *
 * Main module of the application.
 */
angular
  .module('onforteApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/join/:playlistId', {
        templateUrl: 'views/playlist.html',
        controller: 'PlaylistCtrl',
        controllerAs: 'playlist'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

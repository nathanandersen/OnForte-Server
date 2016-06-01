'use strict';

angular.module('onforteApp.auth', ['onforteApp.constants', 'onforteApp.util', 'ngCookies',
    'ngRoute'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

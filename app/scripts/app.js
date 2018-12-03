'use strict';

/**
 * @ngdoc overview
 * @name LemonChat
 * @description
 * # LemonChat
 *
 * Main module of the application.
 */
angular
  .module('LemonChat', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html'
      })
      .when('/register', {
        templateUrl: 'views/register.html'
      })
      .when('/chat', {
        templateUrl: 'views/chat.html'
      })
      .otherwise({
        redirectTo: '/login'
      });
  });

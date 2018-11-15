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
      .when('/', {
        templateUrl: 'views/chat.html',
        controller: 'MessagesController',
      })
      .otherwise({
        redirectTo: '/'
      });
  });

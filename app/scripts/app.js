'use strict';

/**
 * @ngdoc overview
 * @name chatApp
 * @description
 * # chatApp
 *
 * Main module of the application.
 */
angular
  .module('chatApp', [
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
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  .controller('MessagesController', function MessagesController($scope) {
    $scope.messages = [
      'First sample message',
      'Second sample message',
      'Third sample message'
    ]
  })
  });

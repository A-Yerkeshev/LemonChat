angular.module('LemonChat')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html'
      })
      .when('/register', {
        templateUrl: 'views/register.html'
      })
      .when('/home', {
        templateUrl: 'views/home.html'
      })
      .when('/:conversationId', {
        templateUrl: 'views/chat.html'
      })
  });
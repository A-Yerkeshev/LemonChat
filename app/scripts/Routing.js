angular.module('LemonChat')
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
  });

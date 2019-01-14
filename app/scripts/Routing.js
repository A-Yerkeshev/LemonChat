angular.module('LemonChat')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/welcome.html'
      })
      .when('/login', {
        templateUrl: 'views/login.html'
      })
      .when('/register', {
        templateUrl: 'views/register.html'
      })
      .when('/login-redirect', {
        templateUrl: 'views/login-redirect.html'
      })
      .when('/home', {
        templateUrl: 'views/home.html'
      })
      .when('/friends', {
        templateUrl: 'views/friends.html'
      })
      .when('/conversation-:conversationId', {
        templateUrl: 'views/conversation.html'
      })
      .when('/profile-:profileName', {
        templateUrl: 'views/profile.html'
      })
  });

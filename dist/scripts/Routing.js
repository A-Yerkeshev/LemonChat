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
      .when('/:user/home', {
        templateUrl: 'views/home.html'
      })
      .when('/:user/friends', {
        templateUrl: 'views/friends.html'
      })
      .when('/:user/friends/find', {
        templateUrl: 'views/friends-find.html'
      })
      .when('/:user/conversation-:conversationId', {
        templateUrl: 'views/conversation.html'
      })
      .when('/:user/conversation-:conversationId/info', {
        templateUrl: 'views/conversation-info.html'
      })
      .when('/:user/conversation-:conversationId/admins', {
        templateUrl: 'views/conversation-admins.html'
      })
      .when('/:user/profile', {
        templateUrl: 'views/profile.html'
      })
      .when('/:user/new-conversation', {
        templateUrl: 'views/new-conversation.html'
      })
      .when('/:user/:userView', {
        templateUrl: 'views/profile.html'
      })
  });

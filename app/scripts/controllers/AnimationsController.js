angular.module('LemonChat')
  .controller('AnimationsController', function($scope, $window, $location, $route,
    AnimationsService, UsersService) {

    // Call animations on page load
    $window.onload = function() {
      var logBtns = document.getElementsByClassName('log-btn');

      AnimationsService.animateNavButtons(logBtns);
      AnimationsService.animateBackground();
      AnimationsService.animateChat();
    };

    $scope.$on('$viewContentLoaded', function() {
      // Animate view buttons if it is login or register page
      var path = $location.path();
      if (path == '/login' || path == '/register') {
        setTimeout(function() {
          var rightBtn = document.getElementsByClassName('log-right-btn')[0];
          var leftBtn = document.getElementsByClassName('log-left-btn')[0];
          AnimationsService.animateLogButtons(rightBtn, leftBtn);
        }, 500)
      };

      // Animate conversations on hover
      if (path == '/home') {
        setTimeout(function() {
          var conversations = document.getElementsByClassName('conversation')
          AnimationsService.animateList(conversations);
        }, 500)
      };

      // Animate friends item on hover
      if (path == '/friends') {
        setTimeout(function() {
          var friends = document.getElementsByClassName('friend')
          AnimationsService.animateList(friends);
        }, 500)
      };
    });

    // Appear and disappear chat field depending on current path
    $scope.$on('$routeChangeSuccess', function() {
      // Check if current route contains conversationId param. If it does appear chat,
      //if no - disappear it
      var params = $route.current.params;
      if (params.hasOwnProperty('conversationId')) {
        AnimationsService.appearChat()
      } else {
        AnimationsService.disappearChat()
      };

      // Show navigation buttons if user is logged in
      var currentUser = UsersService.getCurrentUser();
      if (currentUser) {
        var usrBtns = document.getElementsByClassName('usr-btn');

        AnimationsService.animateNavButtons(usrBtns);
      }
    })
  })

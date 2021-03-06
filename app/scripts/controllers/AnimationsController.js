angular.module('LemonChat')
  .controller('AnimationsController', function($scope, $window, $location, $route,
    AnimationsService, UsersService) {
    var path = null;

    // Call animations on page load
    $window.onload = function() {
      var logBtns = document.getElementsByClassName('log-btn');

      AnimationsService.animateNavButtons(logBtns);
      AnimationsService.animateBackground();
      AnimationsService.animateChat();
    };

    $scope.$on('$viewContentLoaded', function() {
      // Add hover animation to buttons on each view load
      AnimationsService.animateViewButtons();

      // Animate conversations on hover
      if (path == 'home') {
        setTimeout(function() {
          var conversations = document.getElementsByClassName('conversation');
          var friends = document.getElementsByClassName('friend');

          AnimationsService.animateList(conversations);
          AnimationsService.animateList(friends);
        }, 500)
      };

      // Animate friends item on hover
      setTimeout(function() {
        var friends = document.getElementsByClassName('friend')
        AnimationsService.animateList(friends);
      }, 500)
    });

    // Appear and disappear chat field depending on current path
    $scope.$on('$routeChangeSuccess', function() {
      // Get the last segment of url
      path = $location.path();
      path = path.substr(path.lastIndexOf('/') + 1);

      // Check if current route contains conversationId param. If it does appear chat,
      //if no - disappear it
      var params = $route.current.params;

      if (params.hasOwnProperty('conversationId') && path !== 'info' && path !== 'admins') {
        AnimationsService.appearChat()
      } else {
        AnimationsService.disappearChat()
      };

      // Show navigation buttons if user is logged in
      var currentUser = UsersService.getCurrentUser();
      if (currentUser) {
        var usrBtns = document.getElementsByClassName('usr-btn');

        AnimationsService.animateNavButtons(usrBtns);
      };

      // Change nav buttons if user logged out
      if (path == 'login') {
        AnimationsService.replaceLogButtons('login');
        AnimationsService.disappearUsrButtons();
      };
    });

    $scope.selectImage = function() {
      AnimationsService.appearImageSelectPanel($scope)
    };

    $scope.changeProfileImage = function(image) {
      UsersService.changeProfileImage('/images/' + image);
      AnimationsService.closePanel();
    };

    $scope.closePanel = function() {
      AnimationsService.closePanel()
    };
  })

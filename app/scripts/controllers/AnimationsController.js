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
      // Add hover animation to buttons on each view load
      AnimationsService.animateViewButtons();

      // Get the last segment of url
      var path = $location.path();
      path = path.substr(path.lastIndexOf('/') + 1);

      // Animate conversations on hover
      if (path == 'home') {
        setTimeout(function() {
          var conversations = document.getElementsByClassName('conversation')
          AnimationsService.animateList(conversations);
        }, 500)
      };

      // Animate friends item on hover
      if (path == 'friends') {
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
    });

    $scope.selectImage = function() {
      // Check if panel is already open
      var panel = document.getElementsByClassName('prof-img-panel');
      // If no - open one
      if (panel.length == 0) {
        AnimationsService.appearImageSelectPanel()
      }
    };
  })

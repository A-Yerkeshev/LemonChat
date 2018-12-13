angular.module('LemonChat')
  .controller('AnimationsController', function($scope, $window, $location, AnimationsService) {

    // Call animations on page load
    $window.onload = function() {
      AnimationsService.animateNavButtons();
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
        }, 1000)
      };

      // Animate conversations on hover
      if (path == '/home') {
        setTimeout(function() {
          var conversations = document.getElementsByClassName('conversation')
          AnimationsService.animateConversations(conversations);
        }, 1000)
      };
    })
  })

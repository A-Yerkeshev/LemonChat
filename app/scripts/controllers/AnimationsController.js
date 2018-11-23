angular.module('LemonChat')
  .controller('AnimationsController', function($scope, $window, AnimationsService) {
    // Call animations on page load
    $window.onload = function() {
      AnimationsService.animateButtons();
      AnimationsService.animateBackground();
      AnimationsService.animateChat();
    }
  })

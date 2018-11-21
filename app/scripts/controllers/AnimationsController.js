angular.module('LemonChat')
  .controller('AnimationsController', function($scope, $window, AnimationsService,
    MessagesService) {
    // Call animations on page load
    $window.onload = function() {
      AnimationsService.animateButtons();
      AnimationsService.animateBackground();
      AnimationsService.animateChat();
    }
  })

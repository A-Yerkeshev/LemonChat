angular.module('LemonChat')
  .controller('AnimationsController', function($scope, $window, AnimationsService,
    MessagesService) {
    // Call animations on page load
    $window.onload = function() {
      AnimationsService.animateButtons();
      AnimationsService.animateBackground();
      AnimationsService.animateChat();

      // Animate messages loaded from MessagesService
      var messages = document.getElementsByClassName('message');
      Array.from(messages).forEach(function(message) {
        AnimationsService.animateMessage(message);
      })
    }
  })

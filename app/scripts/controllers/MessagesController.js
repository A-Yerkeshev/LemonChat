angular.module('LemonChat')
  .controller('MessagesController', function($scope, MessagesService,
    AnimationsService) {
    var textArea = document.getElementsByClassName('text-area')[0];

    $scope.messages = MessagesService.messages;

    $scope.submit = function(message) {
      MessagesService.messages.push(message);
      textArea.value = '';
    }
  })

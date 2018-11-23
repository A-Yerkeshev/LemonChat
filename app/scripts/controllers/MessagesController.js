angular.module('LemonChat')
  .controller('MessagesController', function($scope, MessagesService,
    AnimationsService) {
    var textArea = document.getElementsByClassName('text-area')[0];

    $scope.messages = MessagesService.messages;

    $scope.testFunc = function (element) {
      //console.log(element)
      //AnimationsService.animateMessage(message);
    };

    $scope.submit = function(message) {
      MessagesService.messages.push(message);
      textArea.value = '';
    }
  })

angular.module('LemonChat')
  .controller('MessagesController', function($scope, MessagesService) {
    var textArea = document.getElementsByClassName('text-area')[0];

    $scope.messages = MessagesService.messages;

    $scope.submit = function(text) {
      var message = {
        text: text,
        time: new Date()
      }
      MessagesService.messages.push(message);
      textArea.value = '';
    };

    $scope.enterKeypress = function(key, text) {
      if (key.which == 13) {
        $scope.submit(text);
      };
    };
  })

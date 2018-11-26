angular.module('LemonChat')
  .controller('MessagesController', function($scope, MessagesService) {
    var textArea = document.getElementsByClassName('text-area')[0];

    $scope.messages = MessagesService.messages;

    $scope.submit = function(message) {
      MessagesService.messages.push(message);
      textArea.value = '';
    };

    $scope.enterKeypress = function(key, message) {
      if (key.which == 13) {
        $scope.submit(message);
      };
    };
  })

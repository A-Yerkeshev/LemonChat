angular.module('LemonChat')
  .controller('MessagesController', function($scope, MessagesService) {
    var textArea = document.getElementsByClassName('text-area')[0];

    $scope.messages = MessagesService.messages;

    $scope.submit = function(text) {
      var message = {
        text: text,
        date: new Date()
      };
      MessagesService.messages.push(message);
      textArea.value = '';
    };

    $scope.enterKeypress = function(key, text) {
      if (key.which == 13) {
        $scope.submit(text);
      };
    };

    $scope.displayDate = function(date) {
      var local = new Date();
      // If current day and day of message creation are same display only the time
      if (date.toDateString() == local.toDateString()) {
        return String(date.getHours()) + ':' + String(date.getMinutes());
      } else {
      // In other case display full date
        return String(date.getDate()) + '.' + String(date.getMonth()) +
          '.' + String(date.getFullYear());
      };
    }
  })

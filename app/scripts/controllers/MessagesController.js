angular.module('LemonChat')
  .controller('MessagesController', function($scope, MessagesService) {
    var textArea = document.getElementsByClassName('text-area')[0];
    var chat = document.getElementsByClassName('view')[0];

    $scope.messages = MessagesService.messages;

    // Function to submit messages
    $scope.submit = function(text) {
      // Check if text is not whitespace only
      if (/\S/.test(textArea.value)) {
        var message = {
          text: text,
          date: new Date()
        };
        MessagesService.messages.push(message);
        // Clean text area and scroll to the bottom of the chat
        textArea.value = '';
      }
    };

    // Submit message on enter keypress
    $scope.enterKeypress = function(key, text) {
      if (key.which == 13) {
        $scope.submit(text);
      };
    };

    // Function to format time according to current date
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

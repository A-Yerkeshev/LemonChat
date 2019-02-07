angular.module('LemonChat')
  .controller('MessagesController', function($scope, ConversationsService, UsersService) {
    var textArea = document.getElementsByClassName('text-area')[0];
    var currentConversataion = ConversationsService.getCurrentConversation();

    $scope.currentUser = UsersService.getCurrentUser();

    // If conversation is open, get its messages and participants
    if (currentConversataion) {
      $scope.messages = currentConversataion.messages;
      $scope.participants = currentConversataion.participants;
    };

    // Function to submit messages
    $scope.submit = function(text) {
      $scope.currentUser = UsersService.getCurrentUser();
      // Check if text is not whitespace only
      if (/\S/.test(textArea.value)) {
        var message = {
          author: $scope.currentUser.name,
          date: new Date(),
          text: text
        };
        ConversationsService.addMessage(message);
        // Clean text area and scroll chat down on submit
        textArea.value = '';
        var chat = document.getElementsByClassName('view')[0];
        chat.scrollTop = chat.scrollHeight;
      };
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
    };

    $scope.getParticipantImage = function(user) {
      return UsersService.getUserImage(user)
    };
  })

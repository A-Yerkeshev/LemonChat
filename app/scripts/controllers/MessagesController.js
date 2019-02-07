angular.module('LemonChat')
  .controller('MessagesController', function($scope, ConversationsService, UsersService,
    RoutingService) {
    var textArea = document.getElementsByClassName('text-area')[0];

    $scope.currentConversation = ConversationsService.getCurrentConversation();
    $scope.currentUser = UsersService.getCurrentUser();

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

    $scope.redirect = function(path) {
      RoutingService.redirect(path)
    };
  })

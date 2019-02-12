angular.module('LemonChat')
  .controller('ConversationsController', function($scope, ConversationsService,
    UsersService) {
    $scope.participants = [];
    $scope.currentConversation = ConversationsService.getCurrentConversation();

    if ($scope.currentConversation) {
      $scope.currentConversation.participants.forEach(function(participant) {
        $scope.participants.push(UsersService.getUserByName(participant))
      });
    };

    $scope.formatDate = function(conversation) {
      return conversation.initializedAt.toDateString()
    };

  });

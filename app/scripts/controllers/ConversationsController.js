angular.module('LemonChat')
  .controller('ConversationsController', function($scope, ConversationsService,
    UsersService) {
    $scope.currentConversation = ConversationsService.getCurrentConversation();
  });

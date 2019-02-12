angular.module('LemonChat')
  .controller('ConversationsController', function($scope, ConversationsService,
    UsersService) {
    $scope.participants = [];
    $scope.currentConversation = ConversationsService.getCurrentConversation();
    $scope.currentUser = UsersService.getCurrentUser();

    if ($scope.currentConversation) {
      $scope.currentConversation.participants.forEach(function(participant) {
        $scope.participants.push(UsersService.getUserByName(participant))
      });
    };

    $scope.formatDate = function(conversation) {
      return conversation.initializedAt.toDateString()
    };

    $scope.removeFromConversation = function(username) {
      ConversationsService.removeFromConversation($scope.currentConversation, username);

      // Replace remove button with cancel button
      $('#participant-' + username + ' > .remove-friend').hide();
      $('#participant-' + username + ' > .cancel').show();
    };

    $scope.addToConversation = function(username) {
      ConversationsService.addToConversation($scope.currentConversation, username);

      // Replace buttons back
      $('#participant-' + username + ' > .cancel').hide();
      $('#participant-' + username + ' > .remove-friend').show();
    };

    $scope.isAdminOfConversation = function(username) {
      return ConversationsService.isAdmin($scope.currentConversation, username)
    };

    $scope.showAdmins = function() {
      return $scope.currentConversation.administrators.join(', ');
    };

    $scope.invitableFriends = function() {
      var list =[];

      $scope.currentUser.friends.forEach(function(friend) {
        if ($scope.currentConversation.participants.includes(friend) == false) {
          list.push(UsersService.getUserByName(friend))
        };
      });

      return list;
    };

    $scope.inviteToConversation = function(username) {
      ConversationsService.addInvitationRequest($scope.currentConversation,
        $scope.currentUser, username);

      // Replace add button with cancel button
      $('#friend-' + username + ' > .add-friend').hide();
      $('#friend-' + username + ' > .cancel').show();
    };

    $scope.cancelInviteToConversation = function(username) {
      ConversationsService.removeInvitationRequest($scope.currentConversation, username);

      // Replace add button with cancel button
      $('#friend-' + username + ' > .cancel').hide();
      $('#friend-' + username + ' > .add-friend').show();
    };

  });

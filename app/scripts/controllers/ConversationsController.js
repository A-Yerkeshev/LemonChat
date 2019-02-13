angular.module('LemonChat')
  .controller('ConversationsController', function($scope, $compile, ConversationsService,
    UsersService, RoutingService) {
    $scope.participants = [];
    $scope.invitationRequests = [];
    $scope.currentConversation = ConversationsService.getCurrentConversation();
    $scope.currentUser = UsersService.getCurrentUser();

    if ($scope.currentConversation) {
      $scope.currentConversation.participants.forEach(function(participant) {
        $scope.participants.push(UsersService.getUserByName(participant))
      });
      $scope.currentConversation.invitationRequests.forEach(function(request) {
        $scope.invitationRequests.push({
          invitor: request.invitor,
          user: UsersService.getUserByName(request.user)
        });
      });
    };

    function setNgClick(elem, func) {
      elem.off('click');
      elem.attr('ng-click', func);
      $compile(elem)($scope);
    };

    function toggleRequestButtons(set, user) {
      if (set == 'select') {
        // Show selection buttons
        $('#request-' + user + ' > .new-req').show();
        // Hide cancel button
        $('#request-' + user + ' > .cancel').hide();
      };
      if (set == 'cancel') {
        // Show cancel buttons
        $('#request-' + user + ' > .new-req').hide();
        // Hide selection button
        $('#request-' + user + ' > .cancel').show();
      }
    };

    $scope.redirect = function(path) {
      RoutingService.redirect(path)
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

    $scope.approveRequest = function(user, invitor) {
      var cancel = $('#request-' + user.name + ' > .cancel');

      UsersService.sendConvInvitation(user, invitor, $scope.currentConversation.id);
      setNgClick(cancel, 'cancelApproval("' + user.name + '")');
      toggleRequestButtons('cancel', user.name);
    };

    $scope.denyRequest = function(user, invitor) {
      var cancel = $('#request-' + user.name + ' > .cancel');

      ConversationsService.removeInvitationRequest($scope.currentConversation, user.name);
      setNgClick(cancel, 'cancelDeny("' + user.name + '", "' + invitor + '")');
      toggleRequestButtons('cancel', user.name);
    };

    $scope.cancelApproval = function(username) {
      UsersService.cancelConvInvitation(UsersService.getUserByName(username),
      $scope.currentConversation.id);

      toggleRequestButtons('select', username);
    };

    $scope.cancelDeny = function(username, invitor) {
      ConversationsService.addInvitationRequest($scope.currentConversation,
        invitor, username);

      toggleRequestButtons('select', username);
    };

  });

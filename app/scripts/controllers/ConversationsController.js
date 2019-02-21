angular.module('LemonChat')
  .controller('ConversationsController', function($scope, $compile, ConversationsService,
    UsersService, RoutingService) {
    $scope.participants = [];
    $scope.administrators = [];
    $scope.invitationRequests = [];
    $scope.invitationApproves = [];
    $scope.currentConversation = ConversationsService.getCurrentConversation();
    $scope.currentUser = UsersService.getCurrentUser();

    if ($scope.currentConversation) {
      $scope.currentConversation.participants.forEach(function(participant) {
        $scope.participants.push(UsersService.getUserByName(participant));
        if ($scope.currentConversation.administrators.includes(participant)) {
          $scope.administrators.push(UsersService.getUserByName(participant))
        };
      });
      $scope.currentConversation.invitations.requested.forEach(function(request) {
        $scope.invitationRequests.push({
          inviter: request.inviter,
          user: UsersService.getUserByName(request.user)
        });
      });
      $scope.currentConversation.invitations.approved.forEach(function(request) {
        $scope.invitationApproves.push({
          inviter: request.inviter,
          approver: request.approver,
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
        if ($scope.currentConversation.participants.includes(friend) == false &&
          ConversationsService.isInRequestedInvitations(
            friend, $scope.currentConversation) == false &&
          ConversationsService.isInApprovedInvitations(
            friend, $scope.currentConversation) == false) {
          list.push(UsersService.getUserByName(friend))
        };
      });

      return list;
    };

    function approveRequest(user, inviter, approver, conversation) {
      UsersService.sendConvInvitation(user, inviter, conversation.id);
      ConversationsService.approveRequest(conversation, inviter,
        approver, user.name);
      ConversationsService.removeInvitationRequest(conversation, user.name);
    };

    $scope.inviteToConversation = function(user) {
      ConversationsService.addInvitationRequest($scope.currentConversation,
        $scope.currentUser.name, user.name);

      // If user is admin approve request automatically
      if (ConversationsService.isAdmin($scope.currentConversation,
        $scope.currentUser.name)) {
        approveRequest(user, $scope.currentUser.name, $scope.currentUser.name,
          $scope.currentConversation);
      };

      // Replace add button with cancel button
      $('#friend-' + user.name + ' > .add-friend').hide();
      $('#friend-' + user.name + ' > .cancel').show();
    };

    $scope.cancelInviteToConversation = function(user) {
      ConversationsService.removeInvitationRequest($scope.currentConversation, user.name);

      // Replace button back
      $('#friend-' + user.name + ' > .cancel').hide();
      $('#friend-' + user.name + ' > .add-friend').show();
    };

    $scope.approveRequest = function(user, inviter) {
      var cancel = $('#request-' + user.name + ' > .cancel');

      approveRequest(user, inviter, $scope.currentUser.name, $scope.currentConversation);
      setNgClick(cancel, 'cancelApproval("' + user.name + '", "' + inviter + '")');
      toggleRequestButtons('cancel', user.name);
    };

    $scope.denyRequest = function(user, inviter) {
      var cancel = $('#request-' + user.name + ' > .cancel');

      ConversationsService.removeInvitationRequest($scope.currentConversation, user.name);
      setNgClick(cancel, 'cancelDeny("' + user.name + '", "' + inviter + '")');
      toggleRequestButtons('cancel', user.name);
    };

    $scope.cancelApproval = function(username, inviter) {
      UsersService.cancelConvInvitation(UsersService.getUserByName(username),
      $scope.currentConversation.id);
      ConversationsService.cancelApproval($scope.currentConversation, user.name);
      ConversationsService.addInvitationRequest($scope.currentConversation,
        inviter, username);

      toggleRequestButtons('select', username);
    };

    $scope.cancelDeny = function(username, inviter) {
      ConversationsService.addInvitationRequest($scope.currentConversation,
        inviter, username);

      toggleRequestButtons('select', username);
    };

    $scope.nonAdministrators = function() {
      var list = [];

      $scope.participants.forEach(function(participant) {
        if ($scope.administrators.includes(participant) == false) {
          list.push(participant)
        };
      });

      return list;
    };

    $scope.addToAdmins = function(username) {
      ConversationsService.giveAdminPrivileges($scope.currentConversation, username);

      $('#participant-' + username + ' > .add-friend').hide();
      $('#participant-' + username + ' > .cancel').show();

      $('#admin-' + username + ' > .cancel').hide();
      $('#admin-' + username + ' > .remove-friend').show();
    };

    $scope.removeFromAdmins = function(username) {
      ConversationsService.takeAdminPrivileges($scope.currentConversation, username);

      $('#participant-' + username + ' > .cancel').hide();
      $('#participant-' + username + ' > .add-friend').show();

      $('#admin-' + username + ' > .remove-friend').hide();
      $('#admin-' + username + ' > .cancel').show();
    };

    $scope.leaveConversation = function(username) {
      ConversationsService.removeFromConversation(
        $scope.currentConversation, username);
      RoutingService.redirect('home');
    };

  });

angular.module('LemonChat')
  .controller('UsersController', function($scope, $location, $compile, UsersService,
    ConversationsService, RoutingService, AnimationsService) {

    // Get current user on each controller call
    $scope.currentUser = UsersService.getCurrentUser();
    // Retrieve conversation, friend and request objects
    if ($scope.currentUser) {
      $scope.conversations = ConversationsService.getConversationsOfUser(
        $scope.currentUser.name);
      $scope.friends = UsersService.getFriends($scope.currentUser.name);
      $scope.requests = UsersService.getRequestsFrom($scope.currentUser.name);
    };

    // Set profile user to null at first
    $scope.profileUser = null;
    // If profile page is accessed by the currentUser set profileUser to currentUser
    var path = $location.path();
    path = path.substr(path.lastIndexOf('/') + 1);

    if (path == 'profile') {
      $scope.profileUser = $scope.currentUser
    } else {
      // Otherwise set it to user whose profile page is accessed
      $scope.profileUser = UsersService.getUserByName(path)
    };

    // Login user on button click
    $scope.login = function(username, password) {
      var users = UsersService.getAllUsers();
      var alert = document.getElementsByClassName('log-text')[0];
      for (var i=0; i<users.length; i++) {
        if (users[i].name == username) {
          if (users[i].password == password) {
            UsersService.setCurrentUser(users[i]);
            $location.path('/' + username + '/home');
          };
          return;
        };
      };
      alert.innerText = `Username or password is incorrect.
        Maybe you forgot to register?`
    };

    // Register new user
    $scope.register = function(username, password, repPassword) {
      var alert = document.getElementsByClassName('log-text')[0];
      var sameNameUser = UsersService.getUserByName(username);
      // Alert if username is empty
      if (!username) {
        alert.innerText = 'Username cannot be empty!';
        return;
      };
      // Alert is password is empty
      if (!password) {
        alert.innerText = 'Password cannot be empty!';
        return;
      };
      // Alert if passwords do not match
      if (password != repPassword) {
        alert.innerText = 'Passwords do not match!';
        return;
      };
      // Alert if user already exists
      if (sameNameUser != undefined) {
        alert.innerText = 'User with this username already exists!';
        return;
      }
      // Add new user
      if (username && password && repPassword) {
        var newUser = {
          name: username,
          password: password,
          image: '/images/yeoman.png',
          friends: []
        };
        UsersService.addNewUser(newUser);
        // Login newly created user
        $scope.login(username, password);
      };
    };

    // Enter conversation on click
    $scope.enterConversationById = function(conversationId) {
      ConversationsService.enterConversationById(conversationId)
    };

    $scope.enterConversationByNames = function(firstUser, secondUser) {
      ConversationsService.enterConversationByNames(firstUser, secondUser)
    };

    // Display participants of the conversation, except user himself
    $scope.showParticipantsNames = function(currentUser, conversation) {
      var participants = [];
      conversation.participants.forEach(function(participant) {
        if (participant != currentUser) {
          participants.push(participant)
        };
      });
      return participants.join(', ');
    };

    // Display small profile images of participants
    $scope.getParticipantImage = function(user) {
      return UsersService.getUserImage(user)
    };

    // Change path when nav button clicked
    $scope.redirect = function(path) {
      RoutingService.redirect(path)
    };

    $scope.changeAboutField = function() {
      var template = $('#about-change-template').html();

      $('#about-field').replaceWith($compile(template)($scope));
    };

    $scope.saveAboutChanges = function(user) {
      var text = $('.about').val();
      var template = $('#about-info-template').html();

      UsersService.setAboutText(user.name, text);
      $('#about-field').replaceWith($compile(template)($scope));
    };

    $scope.cancelAboutChanges = function() {
      var template = $('#about-info-template').html();

      $('#about-field').replaceWith($compile(template)($scope));
    };

    $scope.getPotentialFriends = function() {
      return UsersService.getUsersExceptFriends($scope.currentUser)
    };

    $scope.sendFriendRequest = function(user) {
      UsersService.addFriendRequest(user, $scope.currentUser);

      // Change button
      $('#user-' + user.name + ' > .add-friend').hide();
      $('#user-' + user.name + ' > .cancel').show();
    };

    $scope.cancelRequest = function(user) {
      UsersService.removeFriendRequest(user, $scope.currentUser);

      // Change button back
      $('#user-' + user.name + ' > .cancel').hide();
      $('#user-' + user.name + ' > .add-friend').show();
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

    function setNgClick(elem, func) {
      elem.off('click');
      elem.attr('ng-click', func);
      $compile(elem)($scope);
    };

    $scope.acceptRequest = function(user) {
      UsersService.acceptRequest($scope.currentUser.name, user);

      var cancel = $('#request-' + user + ' > .cancel');

      setNgClick(cancel, 'cancelAccept("' + user + '")');
      toggleRequestButtons('cancel', user);
    };

    $scope.cancelAccept = function(user) {
      UsersService.cancelAccept($scope.currentUser.name, user);

      toggleRequestButtons('select', user);
    };

    $scope.declineRequest = function(user) {
      UsersService.declineRequest($scope.currentUser.name, user);

      var cancel = $('#request-' + user + ' > .cancel');

      setNgClick(cancel, 'cancelDecline("' + user + '")');
      toggleRequestButtons('cancel', user);
    };

    $scope.cancelDecline = function(user) {
      UsersService.cancelDecline($scope.currentUser.name, user);

      toggleRequestButtons('select', user);
    };
  })

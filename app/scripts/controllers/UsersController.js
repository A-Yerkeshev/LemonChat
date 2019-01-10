angular.module('LemonChat')
  .controller('UsersController', function($scope, $location, UsersService,
    ConversationsService) {

    // Get current user on each controller call
    $scope.currentUser = UsersService.getCurrentUser();
    // If current user is not empty return its conversations and friends list
    if ($scope.currentUser) {
      $scope.conversations = ConversationsService.getConversationsOfUser(
        $scope.currentUser.name);
      $scope.friends = UsersService.getFriends($scope.currentUser.name);
    };

    // Login user on button click
    $scope.login = function(username, password) {
      var users = UsersService.getAllUsers();
      var alert = document.getElementsByClassName('log-text')[0];
      for (var i=0; i<users.length; i++) {
        if (users[i].name == username) {
          if (users[i].password == password) {
            UsersService.setCurrentUser(users[i]);
            $location.path('/home');
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
          password: password
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
    $scope.showParticipants = function(user, conversation) {
      var participants = [];
      conversation.participants.forEach(function(participant) {
        if (participant != user) {
          participants.push(participant)
        };
      });
      return participants.join(', ');
    };

  })

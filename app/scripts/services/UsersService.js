angular.module('LemonChat')
  .service('UsersService', function($filter) {
    var currentUser = null;

    var users = [
      {
        name: 'admin',
        password: 'lemon',
        friends: ['lo', 'lemon']
      }, {
        name: 'lo',
        password: 'lo',
        friends: ['admin', 'lemon']
      }, {
        name: 'lemon',
        password: 'lemon',
        friends: ['lo', 'admin']
      }
    ];

    function getUserByName(username) {
      return $filter('filter')(users, {name: username}, true)[0]
    };

    this.getCurrentUser = function() {
      return currentUser
    };

    this.getAllUsers = function() {
      return users
    };

    this.getUserByName = function(username) {
      return getUserByName(username)
    };

    this.setCurrentUser = function(newCurrentUser) {
      currentUser = newCurrentUser
    };

    this.addNewUser = function(newUser) {
      users.push(newUser)
    };

    this.getFriends = function(user) {
      var user = getUserByName(user);
      return user.friends
    };

  })

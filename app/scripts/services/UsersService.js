angular.module('LemonChat')
  .service('UsersService', function($filter) {
    var currentUser = null;

    var users = [
      {
        name: 'admin',
        password: 'lemon',
        conversations: [
          'lo',
          'lemon'
        ]
      }, {
        name: 'lo',
        password: 'lo',
        conversations: [
          'admin',
          'lemon'
        ]
      }, {
        name: 'lemon',
        password: 'lemon',
        conversations: [
          'admin',
          'lo'
        ]
      }
    ];

    this.getCurrentUser = function() {
      return currentUser
    };

    this.getAllUsers = function() {
      return users
    };

    this.getUserByName = function(username) {
      return $filter('filter')(users, {name: username}, true)[0]
    };

    this.getConversationsOfCurrentUser = function() {
      return currentUser['conversations']
    };

    this.setCurrentUser = function(newCurrentUser) {
      currentUser = newCurrentUser
    };

    this.addNewUser = function(newUser) {
      users.push(newUser)
    };

  })

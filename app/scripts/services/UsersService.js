angular.module('LemonChat')
  .service('UsersService', function($filter) {
    var currentUser = null;

    var users = [
      {
        name: 'admin',
        password: 'lemon',
        connections: [
          'lo',
          'lemon'
        ]
      }, {
        name: 'lo',
        password: 'lo',
        connections: [
          'admin',
          'lemon'
        ]
      }, {
        name: 'lemon',
        password: 'lemon',
        connections: [
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

    this.getConnectionsOfCurrentUser = function() {
      return currentUser[connections]
    };

    this.setCurrentUser = function(newCurrentUser) {
      currentUser = newCurrentUser
    };

    this.addNewUser = function(newUser) {
      users.push(newUser)
    };

  })

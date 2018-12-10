angular.module('LemonChat')
  .service('UsersService', function() {
    var currentUser = null;

    var users = [
      {
        name: 'admin',
        password: 'lemon'
      }, {
        name: 'lo',
        password: 'lo'
      }
    ];

    this.getCurrentUser = function() {
      return currentUser
    };

    this.getAllUsers = function() {
      return users
    }
  })

angular.module('LemonChat')
  .service('UsersService', function() {
    this.currentUser = null;

    this.users = [
      {
        name: 'admin',
        password: 'lemon'
      }
    ];
  })

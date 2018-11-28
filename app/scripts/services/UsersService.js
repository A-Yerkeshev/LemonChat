angular.module('LemonChat')
  .service('UsersService', function() {
    this.users = [
      {
        name: 'admin',
        password: 'lemon'
      }
    ]
  })

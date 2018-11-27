angular.module('LemonChat')
  .service('UsersService', function() {
    this.loggedUser = null

    this.users = [
      {
        name: 'admin',
        password: 'lemon'
      }
    ]
  })

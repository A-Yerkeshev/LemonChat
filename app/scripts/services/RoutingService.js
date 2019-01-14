angular.module('LemonChat')
  .service('RoutingService', function($location, UsersService) {
    this.redirect = function (path) {
      var username = UsersService.getCurrentUser().name;
      $location.path('/' + username + '/' + path);
    }
  })

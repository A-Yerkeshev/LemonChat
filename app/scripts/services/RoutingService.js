angular.module('LemonChat')
  .service('RoutingService', function($scope, $location, UsersService) {
    this.redirect = function (path) {
      var username = UsersService.getCurrentUser().name;
      $location.path('/' + username + '/' + path);
    }
  })

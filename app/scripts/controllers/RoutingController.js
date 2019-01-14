angular.module('LemonChat')
  .controller('RoutingController', function($scope, $location, UsersService) {
    $scope.redirect = function (path) {
      var username = UsersService.getCurrentUser().name;
      $location.path('/' + username + '/' + path);
    }
  })

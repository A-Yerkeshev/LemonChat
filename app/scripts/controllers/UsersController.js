angular.module('LemonChat')
  .controller('UsersController', function($scope, $window, UsersService) {

    $scope.currentUser = null;

    // Login user on button click
    $scope.login = function(username, password) {
      UsersService.users.forEach(function(user) {
        if (user.name == username) {
          if (user.password == password) {
            $scope.currentUser = user;
          };
        } else {
          window.location.href = '/register';
        };
      })
    }
  })

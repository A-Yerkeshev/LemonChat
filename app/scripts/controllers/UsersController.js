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
          $window.location.href = '#!register';
        };
      })
    };

    // Register new user
    $scope.register = function(username, password, repPassword) {
      var alert = document.getElementsByClassName('log-text')[0]
      // Do not perform any action if passwords do not match
      if (password !== repPassword) {
        alert.innerText = 'Passwords do not match!'
        return
      };
      // Add new user
      var newUser = {
        name: username,
        password: password
      };
      UsersService.users.push(newUser);
      // Login newly created user
      $scope.login(username, password);
    }

  })

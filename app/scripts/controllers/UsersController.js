angular.module('LemonChat')
  .controller('UsersController', function($scope, $window, $filter, UsersService) {

    $scope.currentUser = null;

    // Login user on button click
    $scope.login = function(username, password) {
      var alert = document.getElementsByClassName('log-text')[0];
      UsersService.users.forEach(function(user) {
        if (user.name == username) {
          if (user.password == password) {
            $scope.currentUser = user;
            $window.location.href = '#!chat'
          };
        } else {
          alert.innerText = `Username or password is incorrect.
            Maybe you forgot to register?`
        };
      })
    };

    // Register new user
    $scope.register = function(username, password, repPassword) {
      var alert = document.getElementsByClassName('log-text')[0];
      var sameNameUser = $filter('filter')(UsersService.users, {name: username}, true)[0];
      // Alert if username is empty
      if (!username) {
        alert.innerText = 'Username cannot be empty!';
        return;
      };
      // Alert is password is empty
      if (!password) {
        alert.innerText = 'Password cannot be empty!';
        return;
      };
      // Alert if passwords do not match
      if (password != repPassword) {
        alert.innerText = 'Passwords do not match!';
        return;
      };
      // Alert if user already exists
      if (sameNameUser != undefined) {
        alert.innerText = 'User with this username already exists!';
        return;
      }
      // Add new user
      if (username && password && repPassword) {
        var newUser = {
          name: username,
          password: password
        };
        UsersService.users.push(newUser);
        // Login newly created user
        $scope.currentUser = newUser;
        $window.location.href = '#!chat'
      };
    };
  })

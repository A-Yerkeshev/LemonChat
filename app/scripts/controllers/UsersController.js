angular.module('LemonChat')
  .controller('UsersController', function($scope, $window, $filter, UsersService) {

    // Login user on button click
    $scope.login = function(username, password) {
      var users = UsersService.getAllUsers();
      var alert = document.getElementsByClassName('log-text')[0];
      for (var i=0; i<users.length; i++) {
        if (users[i].name == username) {
          if (users[i].password == password) {
            UsersService.setCurrentUser(users[i]);
            $window.location.href = '#!/home';
          };
          return;
        };
      };
      alert.innerText = `Username or password is incorrect.
        Maybe you forgot to register?`
    };

    // Register new user
    $scope.register = function(username, password, repPassword) {
      var alert = document.getElementsByClassName('log-text')[0];
      var sameNameUser = UsersService.getSameNameUser(username);
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
        UsersService.addNewUser(newUser);
        // Login newly created user
        $scope.login(username, password);
      };
    };
  })

angular.module('LemonChat')
  .service('UsersService', function($filter) {
    var currentUser = null;

    var users = [
      {
        name: 'admin',
        password: 'lemon',
        image: '/images/yeoman.png',
        about: 'The Great King of this project',
        friends: ['lo', 'lemon']
      }, {
        name: 'lo',
        password: 'lo',
        image: '/images/lemon.png',
        about: 'Test user with short name for easy login',
        friends: ['admin', 'lemon']
      }, {
        name: 'lemon',
        password: 'lemon',
        image: '/images/yeoman.png',
        about: 'Lemon. Just a lemon',
        friends: ['lo', 'admin']
      }
    ];

    function getUserByName(username) {
      return $filter('filter')(users, {name: username}, true)[0]
    };

    this.getCurrentUser = function() {
      return currentUser
    };

    this.getAllUsers = function() {
      return users
    };

    this.getUserByName = function(username) {
      return getUserByName(username)
    };

    this.getFriends = function(username) {
      var names = getUserByName(username).friends;
      var friends = [];
      names.forEach(function(name) {
        friends.push(getUserByName(name))
      });
      return friends
    };

    this.getUserImage = function(username) {
      return getUserByName(username).image
    };

    this.getAboutInfo = function(username) {
      var user = getUserByName(username);

      return user.about;
    };

    this.setCurrentUser = function(newCurrentUser) {
      currentUser = newCurrentUser
    };

    this.addNewUser = function(newUser) {
      users.push(newUser)
    };

    this.changeProfileImage = function(image) {
      var user = getUserByName(currentUser.name);

      user.image = image;
    };

    this.setAboutText = function(username, text) {
      var user = getUserByName(username);

      user.about = text;
    };

  })

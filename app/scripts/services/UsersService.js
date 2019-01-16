angular.module('LemonChat')
  .service('UsersService', function($filter) {
    var currentUser = null;

    var users = [
      {
        name: 'admin',
        password: 'lemon',
        image: '/images/admin/profile-img.png',
        friends: ['lo', 'lemon']
      }, {
        name: 'lo',
        password: 'lo',
        image: '/images/lo/profile-img.png',
        friends: ['admin', 'lemon']
      }, {
        name: 'lemon',
        password: 'lemon',
        image: '/images/lemon/profile-img.png',
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

    this.setCurrentUser = function(newCurrentUser) {
      currentUser = newCurrentUser
    };

    this.addNewUser = function(newUser) {
      users.push(newUser)
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

  })

angular.module('LemonChat')
  .service('UsersService', function($filter) {
    var currentUser = null;

    var users = [
      {
        name: 'admin',
        password: 'lemon',
        image: '/images/yeoman.png',
        about: 'The Great King of this project',
        friends: ['lo', 'lemon'],
        requests: {
          from: ['orange'],
          to: []
        }
      }, {
        name: 'lo',
        password: 'lo',
        image: '/images/yeoman.png',
        about: 'Test user with short name for easy login',
        friends: ['admin', 'lemon'],
        requests: {
          from: ['orange'],
          to: []
        }
      }, {
        name: 'lemon',
        password: 'lemon',
        image: '/images/lemon.png',
        about: 'Lemon. Just a lemon',
        friends: ['lo', 'admin', 'orange', 'grapefruit'],
        requests: {
          from: [],
          to: []
        }
      }, {
        name: 'orange',
        password: 'orange',
        image: '/images/orange.png',
        about: 'Orange. Just a orange',
        friends: ['lemon', 'grapefruit'],
        requests: {
          from: [],
          to: []
        }
      }, {
        name: 'grapefruit',
        password: 'grapefruit',
        image: '/images/grapefruit.png',
        about: 'Grapefruit. Just a grapefruit',
        friends: ['lemon', 'orange'],
        requests: {
          from: [],
          to: []
        }
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

    this.getUsersExceptFriends = function(currentUser) {
      var result = [];
      users.forEach(function(user) {
        if (currentUser.friends.includes(user.name) == false &&
          currentUser.name != user.name) {
          result.push(user);
        };
      });
      return result
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

    this.addFriendRequest = function(userTo, userFrom) {
      if (userFrom.requests.to.includes(userTo.name) == false) {
        userFrom.requests.to.push(userTo.name);
      };

      if (userTo.requests.from.includes(userFrom.name) == false) {
        userTo.requests.from.push(userFrom.name);
      }
    };

  })

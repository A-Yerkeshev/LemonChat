angular.module('LemonChat')
  .service('UsersService', function($filter, $compile) {
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

    this.changeProfileImage = function(image) {
      var user = getUserByName(currentUser.name);

      user.image = image;
    };

    this.changeAboutField = function(scope) {
      // Get about text without edit button
      var text = $('.about').clone().children().remove().end().text();

      var textarea = angular.element('<textarea class="about">' + text + '</textarea>');
      var button = angular.element(
        '<button class="button about-edit ng-click="saveAboutChanges()">Save</button>');

      $('.about').replaceWith($compile(textarea)(scope));
      $('.about-edit').replaceWith($compile(button)(scope));
    };

  })

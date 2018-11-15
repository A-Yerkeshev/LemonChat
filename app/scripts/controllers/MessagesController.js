angular.module('LemonChat')
  .controller('MessagesController', function MessagesController($scope) {
    $scope.messages = [
      'First sample message',
      'Second sample message',
      'Third sample message'
    ]
  })

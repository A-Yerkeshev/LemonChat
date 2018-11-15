angular.module('LemonChat')
  .controller('MessagesController', function($scope, MessagesService) {
    $scope.messages = MessagesService.messages

    $scope.submit = function(message) {
      MessagesService.messages.push(message);
    }
  })

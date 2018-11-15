angular.module('LemonChat')
  .service('MessagesService', function() {
    this.messages = [
      'First sample message',
      'Second sample message',
      'Third sample message'
    ]
  })

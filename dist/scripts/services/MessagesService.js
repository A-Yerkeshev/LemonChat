angular.module('LemonChat')
  .service('MessagesService', function() {
    var messages = [
      {
        text: 'First sample message',
        date: new Date()
      },
      {
        text: 'Second sample message',
        date: new Date(2018, 1, 13, 22, 50)
      },
      {
        text: 'First sample message',
        date: new Date(1953, 5, 6, 14, 21)
      },
    ];

    this.getMessages = function() {
      return messages
    }
  })

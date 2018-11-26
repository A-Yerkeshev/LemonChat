angular.module('LemonChat')
  .service('MessagesService', function() {
    this.messages = [
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
    ]
  })

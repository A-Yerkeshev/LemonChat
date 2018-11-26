angular.module('LemonChat')
  .service('MessagesService', function() {
    this.messages = [
      {
        text: 'First sample message',
        date: new Date()
      },
      {
        text: 'Second sample message',
        date: new Date()
      },
      {
        text: 'First sample message',
        date: new Date()
      },
    ]
  })

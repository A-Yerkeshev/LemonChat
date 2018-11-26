angular.module('LemonChat')
  .service('MessagesService', function() {
    this.messages = [
      {
        text: 'First sample message',
        time: '9:21'
      },
      {
        text: 'Second sample message',
        time: '16:43'
      },
      {
        text: 'First sample message',
        time: '21:56'
      },
    ]
  })

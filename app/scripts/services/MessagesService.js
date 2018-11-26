angular.module('LemonChat')
  .service('MessagesService', function() {
    this.messages = [
      {
        text: 'First sample message',
        time: new Date(2018, 11, 26, 10, 33)
      },
      {
        text: 'Second sample message',
        time: new Date(2018, 11, 26, 10, 33)
      },
      {
        text: 'First sample message',
        time: new Date(2018, 11, 26, 10, 33)
      },
    ]
  })

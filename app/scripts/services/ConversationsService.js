angular.module('LemonChat')
  .service('ConversationsService', function() {
    var conversations = [
      {
        id: 1,
        participants: ['lo, lemon'],
        messages: [
          {
            author: 'lo',
            date: new Date(2018, 1, 13, 22, 50),
            text: 'Hello, Lemon'
          }, {
            author: 'lemon',
            date: new Date(2018, 1, 13, 22, 50),
            text: 'Hello, Lo'
          }
        ]
      }, {
        id: 2,
        participants: ['admin, lo'],
        messages: [
          {
            author: 'admin',
            date: new Date(2018, 1, 13, 22, 50),
            text: 'Welcome to LemonChat, Lo'
          }, {
            author: 'lo',
            date: new Date(2018, 1, 13, 22, 50),
            text: 'Thank you!'
          }
        ]
      }
    ];

    this.getConversationsOfUser = function(user) {
      var userConversations = [];
      conversations.forEach(function(conversation) {
        if (conversation.participants.includes(user)) {
          userConversations.push(conversation)
        };
      });
      return userConversations
    }
  })

angular.module('LemonChat')
  .service('ConversationsService', function($location) {
    var currentConversation = null;

    var conversations = [
      {
        id: 1,
        participants: ['lo', 'lemon', 'admin'],
        messages: [
          {
            author: 'lo',
            date: new Date(2018, 1, 13, 22, 50),
            text: 'Hello, Lemon'
          }, {
            author: 'lemon',
            date: new Date(2018, 1, 13, 23, 3),
            text: 'Hello, Lo'
          }
        ]
      }, {
        id: 2,
        participants: ['admin', 'lo'],
        messages: [
          {
            author: 'admin',
            date: new Date(2018, 5, 21, 17, 40),
            text: 'Welcome to LemonChat, Lo'
          }, {
            author: 'lo',
            date: new Date(2018, 5, 22, 8, 33),
            text: 'Thank you!'
          }
        ]
      }
    ];

    this.getConversationsOfUser = function(name) {
      var userConversations = [];
      conversations.forEach(function(conversation) {
        if (conversation.participants.includes(name)) {
          userConversations.push(conversation)
        };
      });
      return userConversations;
    };

    this.getCurrentConversation = function() {
      return currentConversation
    };

    this.enterConversation = function(conversation) {
      $location.path('/conversation-' + conversation.id);
      currentConversation = conversation;
    };

    this.addMessage = function(message) {
      currentConversation.messages.push(message)
    }
  })

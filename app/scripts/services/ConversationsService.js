angular.module('LemonChat')
  .service('ConversationsService', function($location, RoutingService) {
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

    function enterConversationById(conversation) {
      RoutingService.redirect('conversation-' + conversation.id)
      currentConversation = conversation;
    };

    this.enterConversationById = function(conversation) {
      enterConversationById(conversation)
    };

    // Function to check if arrays have same participants in any order
    function equalParticipants(firstList, secondList) {
      if (firstList.length !== secondList.length) {
        return false
      };
      for (j=0; j<firstList.length; j++) {
        if (secondList.includes(firstList[j]) == false) {
          return false
        }
      };
      return true
    };

    this.enterConversationByNames = function(firstUser, secondUser) {
      var users = [firstUser, secondUser];

      // Check if conversation between users already exists
      for (i=0; i<conversations.length; i++) {
        if (equalParticipants(conversations[i].participants, users)) {
          enterConversationById(conversations[i]);
          return;
        }
      }
      // Otherwise initialize new conversation
      var newConversation = {
        id: conversations.length+1,
        participants: users,
        messages: []
      };
      conversations.push(newConversation);
      enterConversationById(newConversation);
    };

    this.addMessage = function(message) {
      currentConversation.messages.push(message)
    };
  })

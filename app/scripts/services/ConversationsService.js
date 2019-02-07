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

    function getConversationById(conversationId) {
      return conversations[conversationId - 1]
    };

    function enterConversationById(conversationId) {
      RoutingService.redirect('conversation-' + conversationId)
      currentConversation = getConversationById(conversationId);
    };

    this.enterConversationById = function(conversation) {
      enterConversationById(conversation)
    };

    // Function to check if arrays have same participants in any order
    function sameParticipants(firstList, secondList) {
      if (firstList.length !== secondList.length) {
        return false
      };
      for (j=0; j<firstList.length; j++) {
        if (secondList.includes(firstList[j]) == false) {
          return false
        }
      };
      return true;
    };

    function conversationExists(users) {
      for (k=0; k<conversations.length; k++) {
        if (sameParticipants(conversations[k].participants, users)) {
          return true
        };
      };
      return false;
    };

    this.conversationExists = function(users) {
      return conversationExists(users)
    };

    function newConversation(users) {
      var newConversation = {
        id: conversations.length+1,
        participants: users,
        messages: []
      };
      conversations.push(newConversation);
      enterConversationById(newConversation.id);
    };

    this.enterConversationByNames = function(firstUser, secondUser) {
      var users = [firstUser, secondUser];

      // Check if conversation between users already exists
      for (i=0; i<conversations.length; i++) {
        if (sameParticipants(conversations[i].participants, users)) {
          enterConversationById(conversations[i].id);
          return;
        }
      }
      // Otherwise initialize new conversation
      newConversation(users);
    };

    this.addMessage = function(message) {
      currentConversation.messages.push(message)
    };

    this.startNewConversation = function(users) {
      var list = [];
      users.forEach(function (user) {
        list.push(user.name)
      });
      newConversation(list);
    };

    this.getConversationParticipants = function(conversationId) {
      var conversation = getConversationById(conversationId);

      return conversation.participants;
    };

  })

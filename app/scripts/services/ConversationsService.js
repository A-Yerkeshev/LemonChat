angular.module('LemonChat')
  .service('ConversationsService', function($location, RoutingService) {
    var currentConversation = null;

    var conversations = [
      {
        id: 1,
        name: 'Citrus chat',
        participants: ['lo', 'lemon', 'admin'],
        initiator: 'lo',
        administrators: ['lo'],
        invitations: {
          requested: [{
            inviter: 'lemon',
            user: 'orange'
          }],
          approved: [{
            inviter: 'lo',
            approver: 'admin',
            user: 'grapefruit'
          }]
        },
        initializedAt: new Date(2018, 1, 13, 17, 21),
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
        name: '',
        participants: ['admin', 'lemon'],
        initiator: 'admin',
        administrators: ['admin'],
        invitations: {
          requested: [],
          approved: [{
            inviter: 'lemon',
            approver: 'admin',
            user: 'lo'
          }]
        },
        initializedAt: new Date(2018, 5, 21, 17, 39),
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

    function newConversation(users, initiator) {
      var newConversation = {
        id: conversations.length+1,
        name: '',
        participants: users,
        initiator: initiator,
        administrators: [initiator],
        initializedAt: new Date(),
        invitations: {
          requested: [],
          approved: []
        },
        messages: []
      };
      conversations.push(newConversation);
      enterConversationById(newConversation.id);
    };

    this.enterConversationByNames = function(initiator, secondUser) {
      var users = [initiator, secondUser];

      // Check if conversation between users already exists
      for (i=0; i<conversations.length; i++) {
        if (sameParticipants(conversations[i].participants, users)) {
          enterConversationById(conversations[i].id);
          return;
        }
      }
      // Otherwise initialize new conversation
      newConversation(users, initiator);
    };

    this.addMessage = function(message) {
      currentConversation.messages.push(message)
    };

    this.startNewConversation = function(users, initiator) {
      var list = [];
      users.forEach(function (user) {
        list.push(user.name)
      });
      newConversation(list, initiator);
    };

    this.getConversationParticipants = function(conversationId) {
      var conversation = getConversationById(conversationId);

      return conversation.participants;
    };

    function removeFromConversation(conversation, username) {
      var participants = conversation.participants;
      var index = participants.indexOf(username);

      participants.splice(index, 1);
    };

    function addToConversation(conversation, username) {
      conversation.participants.push(username)
    };

    this.removeFromConversation = function(conversation, username) {
      removeFromConversation(conversation, username)
    };

    this.addToConversation = function(conversation, username) {
      addToConversation(conversation, username)
    };

    this.isAdmin = function(conversation, username) {
      if (conversation.administrators.includes(username)) {
        return true
      } else {
        return false
      }
    };

    this.addInvitationRequest = function(conversation, inviter, username) {
      conversation.invitations.requested.push({
        inviter: inviter,
        user: username
      })
    };

    this.removeInvitationRequest = function(conversation, username) {
      var requests = conversation.invitations.requested;

      for (i=0; i<requests.length; i++) {
        if (requests[i].user == username) {
          requests.splice(i, 1);
          return;
        };
      };
    };

    function addToApprovedRequests(conversation, inviter, approver, username) {
      conversation.invitations.approved.push({
        inviter: inviter,
        approver: approver,
        user: username
      })
    };

    this.approveRequest = function(conversation, inviter, approver, username) {
      addToApprovedRequests(conversation, inviter, approver, username)
    };

    function removeFromApprovedRequests(conversation, username) {
      var requests = conversation.invitations.approved;

      for (i=0; i<requests.length; i++) {
        if (requests[i].user == username) {
          requests.splice(i, 1);
          return;
        };
      };
    };

    this.cancelApproval = function(conversation, username) {
      removeFromApprovedRequests(conversation, username)
    };

    this.isInRequestedInvitations = function(username, conversation) {
      var requests = conversation.invitations.requested;

      for (i=0; i<requests.length; i++) {
        if (requests[i].user == username) {
          return true
        };
      };

      return false;
    };

    this.isInApprovedInvitations = function(username, conversation) {
      var requests = conversation.invitations.approved;

      for (i=0; i<requests.length; i++) {
        if (requests[i].user == username) {
          return true
        };
      };

      return false;
    };

    this.giveAdminPrivileges = function(conversation, username) {
      conversation.administrators.push(username)
    };

    this.takeAdminPrivileges = function(conversation, username) {
      var index = conversation.administrators.indexOf(username);

      conversation.administrators.splice(index, 1);
    };

    this.getConvInvitations = function(invitations) {
      var list = [];

      invitations.forEach(function(invitation) {
        list.push(getConversationById(invitation.conversationId))
      });

      return list;
    };

    this.acceptConvInvitation = function(conversation, username) {
      removeFromApprovedRequests(conversation, username);
      addToConversation(conversation, username);
    };

    this.cancelAcceptConvInvitation = function(
      conversationId, inviter, approver, username) {
      var conversation = getConversationById(conversationId);

      addToApprovedRequests(conversation, inviter, approver, username);
      removeFromConversation(conversation, username);
    };

    this.getInvitationByName = function(conversation, username, set) {
      var invitations = null;

      if (set == 'requested') {
        invitations = conversation.invitations.requested
      };
      if (set == 'approved') {
        invitations = conversation.invitations.approved
      };

      for (i=0; i<invitations.length; i++) {
        if (invitations[i].user == username) {
          return invitations[i]
        }
      }
    };

    this.rejectConvInvitation = function(conversation, username) {
      removeFromApprovedRequests(conversation, username);
    };

    this.cancelRejectConvInvitation = function(
      conversationId, inviter, approver, username) {
      var conversation = getConversationById(conversationId);

      addToApprovedRequests(conversation, inviter, approver, username);
    };

  })

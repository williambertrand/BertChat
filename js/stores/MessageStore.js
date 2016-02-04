var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var ChatMessageUtils = require('../utils/ChatMessageUtils');
var EventEmitter = require('events').EventEmitter;
var ThreadStore = require('../stores/ThreadStore');
var assign = require('object-assign');

var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'change';


//firebase ref for the database
var _bertMessagesRef = new Firebase("https://bertchat.firebaseIO.com")
var _messages = [];

function _addMessages(rawMessages) {

  //add all raw messages from local storage - this is only required
  //if there are default/non-databases stored messages
  //that one would want to add
  // rawMessages.forEach(function(message) {
  //   if (!_messages[message.id]) {
  //     _messages[message.id] = ChatMessageUtils.convertRawMessage(
  //       message,
  //       ThreadStore.getCurrentID()
  //     );
  //   }
  // });
}

function _markAllInThreadRead(threadID) {
  for (var id in _messages) {
    if (_messages[id].threadID === threadID) {
      _messages[id].isRead = true;
    }
  }
}

var MessageStore = assign({}, EventEmitter.prototype, {

  init: function() {
    var messageRef = _bertMessagesRef.child('messages');
    messageRef.on('child_added', function(snapshot, prevChildKey){
      var messageData = snapshot.val()
      var message = ChatMessageUtils.convertFBMessage(messageData, ThreadStore.getCurrentID())
      _messages.push(message)
      MessageStore.emitChange();
    });
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: function(id) {
    return _messages[id];
  },

  getAll: function() {
    return _messages;
  },

  /**
   * @param {string} threadID
   */
  getAllForThread: function(threadID) {
    var threadMessages = [];
    for (var id in _messages) {
      if (_messages[id].threadID === threadID) {
        threadMessages.push(_messages[id]);
      }
    }
    threadMessages.sort(function(a, b) {
      if (a.date < b.date) {
        return -1;
      } else if (a.date > b.date) {
        return 1;
      }
      return 0;
    });
    return threadMessages;
  },

  getAllForCurrentThread: function() {
    return this.getAllForThread(ThreadStore.getCurrentID());
  }

});


//set what is to be done when the dispatcher receives action of any type
MessageStore.dispatchToken = ChatAppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.CLICK_THREAD:
      ChatAppDispatcher.waitFor([ThreadStore.dispatchToken]);
      _markAllInThreadRead(ThreadStore.getCurrentID());
      MessageStore.emitChange();
      break;

    case ActionTypes.CREATE_MESSAGE:
      var message = ChatMessageUtils.getCreatedMessageData(
        action.text,
        action.currentThreadID
      );
      MessageStore.emitChange();
      break;

    case ActionTypes.RECEIVE_RAW_MESSAGES:
      MessageStore.init();
      _addMessages(action.rawMessages);
      ChatAppDispatcher.waitFor([ThreadStore.dispatchToken]);
      _markAllInThreadRead(ThreadStore.getCurrentID());
      MessageStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = MessageStore;

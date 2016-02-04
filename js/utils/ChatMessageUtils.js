/**
  Mostly used for converting between messages returned by firebase 
  and what is being used in the app
**/
var ThreadStore = require('../stores/ThreadStore')
var UserStore = require('../stores/UserStore')
module.exports = {

  convertRawMessage: function(rawMessage, currentThreadID) {
    return {
      id: rawMessage.id,
      threadID: rawMessage.threadID,
      authorName: rawMessage.authorName,
      date: new Date(rawMessage.timestamp),
      text: rawMessage.text,
      isRead: rawMessage.threadID === currentThreadID
    };
  },

  convertFBMessage: function(message, currentThreadID) {
    return {
      id: message.id,
      threadID: message.threadID,
      authorName: message.authorName,
      threadName: message.threadName,
      date: new Date(message.timestamp),
      text: message.text,
      isRead: message.threadID === currentThreadID
    };
  },

  getCreatedMessageData: function(text, currentThreadID) {
    var timestamp = Date.now();
    var currentThreadName = ThreadStore.getThreadNameForID(currentThreadID);
    var currentUserName = UserStore.getCurrentUser().firstName;
    return {
      id: 'm_' + timestamp,
      threadID: currentThreadID,
      threadName: currentThreadName,
      authorName: currentUserName,
      date: new Date(timestamp),
      text: text,
      isRead: true
    };
  }
};

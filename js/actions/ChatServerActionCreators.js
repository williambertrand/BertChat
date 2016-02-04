var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {


  //create an action of type RECEIVE_RAW_MESSAGES - dispatcher "dispatches"
  //this action to the stores - this is caled when the app starts
  //raw messages are stored in localstorage - only 1 default message
  //currently in use
  receiveAll: function() {
    ChatAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_RAW_MESSAGES
    });
  },

  receiveCreatedMessage: function(createdMessage) {
    ChatAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_RAW_CREATED_MESSAGE,
      rawMessage: createdMessage
    });
  }

};

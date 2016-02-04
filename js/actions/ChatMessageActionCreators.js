
//dispatcher
var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');

//chat utils
var ChatConstants = require('../constants/ChatConstants');
var ChatWebAPIUtils = require('../utils/ChatWebAPIUtils');
var ChatMessageUtils = require('../utils/ChatMessageUtils');

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {

  //create an action of type CREATE_MESSAGE - dispatcher "dispatches"
  //this action to the stores
  createMessage: function(text, currentThreadID) {
    ChatAppDispatcher.dispatch({
      type: ActionTypes.CREATE_MESSAGE,
      text: text,
      currentThreadID: currentThreadID
    });
    var message = ChatMessageUtils.getCreatedMessageData(text, currentThreadID);
    ChatWebAPIUtils.createMessage(message);
  }

};

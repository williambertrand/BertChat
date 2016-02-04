var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');

var ActionTypes = ChatConstants.ActionTypes;


//dispatches any actions relevant to threads
module.exports = {

  clickThread: function(threadID) {
    ChatAppDispatcher.dispatch({
      type: ActionTypes.CLICK_THREAD,
      threadID: threadID
    });
  },

  createNewThread: function(threadID) {
    ChatAppDispatcher.dispatch({
      type: ActionTypes.CREATE_NEW_THREAD,
      threadID: threadID
    });
  },

  clickDeleteThread : function(threadID) {
    ChatAppDispatcher.dispatch({
      type: ActionTypes.DELETE_THREAD,
      threadID: threadID
    });
  }

};

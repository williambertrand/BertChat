var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');


//this will control all actions relevant to user
//i.e. loging in/out, changing info...
var ActionTypes = ChatConstants.ActionTypes;

module.exports = {

  setUserName: function(user) {
    ChatAppDispatcher.dispatch({
      type: ActionTypes.LOG_IN_USER,
      user: user
    });
  }

};

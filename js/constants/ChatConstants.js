/**
All actions for chatApp
**/
var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    CLICK_THREAD: null,
    CREATE_MESSAGE: null,
    RECEIVE_RAW_CREATED_MESSAGE: null,
    RECEIVE_RAW_MESSAGES: null,
    CREATE_NEW_THREAD: null,
    DELETE_THREAD: null,
    LOG_IN_USER: null,
    CREATE_NEW_USER:null
  })

};

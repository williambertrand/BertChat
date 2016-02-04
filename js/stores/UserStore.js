/*
  Store for holding users and user info
  Still in implementation

*/
var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var ChatMessageUtils = require('../utils/ChatMessageUtils');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _bertFirebaseRef = new Firebase("https://bertchat.firebaseIO.com")
var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _currentUser = {
    firstName: 'Set Your user name!',
    lastName: ''
  };

var _users = {};


var officialBertSuperSecretUserName = 'bertbertbert';


var UserStore = assign({}, EventEmitter.prototype, {


  //load users from firebase
  //this should probably actually be done in the web api utils
  init: function() {
    var userRef = _bertFirebaseRef.child("users");
    userRef.on("child_added", function(snapshot) {
        var user = snapshot.val();

        var first = user.first
        var last = user.last
        //potential for prof. pic

        UserStore.emitChange();
    });
  },

  createNewUser: function(newUser) {
    var userRef = _bertFirebaseRef.child("users");
    var timestamp = Date.now();

    userRef.push().set({
      firstName : newUser.firstName,
      lastName : newUser.lastName,
      id: "u_" + timestamp,
      timestamp: timestamp
    });

  },

  loginUser:function(user) {
    _currentUser = user
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

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  /**
   * @param {string} id
   */
  get: function(id) {
    return _users[id];
  },

  getAll: function() {
    return _users;
  },


  getCurrentUser: function() {
    return _currentUser;
  },

  getCurrent: function() {
    return this.get(this.getCurrentUser());
  }

});

UserStore.dispatchToken = ChatAppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.CREATE_NEW_USER:
      UserStore.createNewUser(action.user);
      UserStore.loginUser(action.user)
      UserStore.emitChange();

    case ActionTypes.LOG_IN_USER:
      console.log('in userstore dispatch')
      UserStore.loginUser(action.user)
      UserStore.emitChange();

    default:
      // do nothing
  }

});

module.exports = UserStore;

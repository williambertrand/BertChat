/**
ThreadStore - stores all thread data
**/
var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var ChatMessageUtils = require('../utils/ChatMessageUtils');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
//firebase ref - not entirely sure if stores are the proper place to
//access firebase database, but for now it works :)
var _bertMessagesRef = new Firebase("https://bertchat.firebaseIO.com")

var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _threads = {};

//message to be added to an empty thread - this could be removed
//and a different way of handling empty threads could be
//implemented
var emptyThreadID = 'th_3019195279'
var defaultEmptyMessage = {
  id: 'empty_id3019195279',
  threadID: emptyThreadID,
  authorName: 'Bert',
  date: new Date(Date.now()),
  text: 'Click on an existing thread, or make a new one to chat with me!',
  isRead: true
}

_threads[emptyThreadID] = {
  id: emptyThreadID,
  name: 'Welcome to BertChat',
  lastMessage: defaultEmptyMessage,
  firebaseId: '8675309'
}

//start current id as the empty "welcome" thread
var _currentID = emptyThreadID;
var _allMessages = {}

var ThreadStore = assign({}, EventEmitter.prototype, {

  init: function() {

    //create a default empty thread
    var messageRef = _bertMessagesRef.child("messages");
    var prevID = '';
    //bind _threads to changes made in firebase ref
    messageRef.on("child_added", function(snapshot) {

        var message = snapshot.val();
        var key ='';
        var threadID = message.threadID;
        var thread = _threads[threadID];

        messageObj = {
          id: message.id,
          threadID: message.threadID,
          authorName: message.authorName,
          threadName: message.threadName,
          date: new Date(message.timestamp),
          text: message.text,
          isRead: message.threadID === _currentID,
          firebaseId: 'key'
        };

        if (thread && thread.lastMessage.timestamp > message.timestamp) {
          return;
        }

        _threads[threadID] = {
          id: threadID,
          name: message.threadName,
          lastMessage: messageObj
        };



        //threadstore is changed, so emit a change event
        ThreadStore.emitChange();
    });
  },

  createNewThread: function(newThreadId) {
    var messageRef = _bertMessagesRef.child("messages");
    var timestamp = Date.now();

    messageRef.push().set({
      threadID:newThreadId,
      threadName: 'Chat with Bert ' + newThreadId,
      id: "m_" + timestamp,
      authorName: 'Bert',
      text: "Hey, I'm Bert, what do you want to chat about?",
      timestamp: timestamp
    });

    messageRef.push().set({
      threadID:newThreadId,
      threadName: 'Chat with Bert ' + newThreadId,
      id: "m_" + timestamp,
      authorName: 'Bert',
      text: "Hey, I'm Bert, what do you want to chat about?",
      timestamp: timestamp
    });

  },

  getThreadNameForID : function(threadID){
    for (var id in _threads) {
      if (id === threadID) {
        return _threads[id].name;
      }
    }
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
    return _threads[id];
  },

  getAll: function() {
    return _threads;
  },

  getAllChrono: function() {
    var orderedThreads = [];
    for (var id in _threads) {
      var thread = _threads[id];
      orderedThreads.push(thread);
    }
    orderedThreads.sort(function(a, b) {
      if (a.name === 'Welcome to BertChat'){return -1}

      if (a.lastMessage.date < b.lastMessage.date) {
        return -1;
      } else if (a.lastMessage.date > b.lastMessage.date) {
        return 1;
      }
      return 0;
    });
    return orderedThreads;
  },

  getCurrentID: function() {
    return _currentID;
  },

  getCurrent: function() {
    if (_currentID == null) {
      console.log('yes sir');
      return _threads[emptyThreadID];
    }
    return this.get(this.getCurrentID());
  },


/**
  Still in progress
**/
  deleteThread: function(threadID){
    var messageRef = _bertMessagesRef.child("messages");
    console.log('the thread to be deleted is ', threadID);
    //var _bertMessagesRef = new Firebase("https://bertchat.firebaseIO.com")
    messageRef.orderByChild("threadID").on("child_added", function(snapshot) {
  console.log(snapshot.key() + " was " + snapshot.val().threadID + " meters tall");
});


    for (var id in _threads) {
      if (id === threadID) {
        //_threads[id] = null;
        console.log('found thread in for loop');
      }
    }

  }

});


//handle actions disptached to the thread store
ThreadStore.dispatchToken = ChatAppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.CLICK_THREAD:
      _currentID = action.threadID;
      _threads[_currentID].lastMessage.isRead = true;
      ThreadStore.emitChange();
      break;

    case ActionTypes.RECEIVE_RAW_MESSAGES:
      ThreadStore.init();
      ThreadStore.emitChange();
      break;

    case ActionTypes.CREATE_NEW_THREAD:
      ThreadStore.createNewThread(action.threadID);
      //set current thread to the thread that was created
      _currentID = action.threadID;
      _threads[_currentID].lastMessage.isRead = true;
      ThreadStore.emitChange();

    case ActionTypes.DELETE_THREAD:
      ThreadStore.deleteThread(action.threadID);
      if (_currentID === action.threadID) {
          var allThreads = ThreadStore.getAllChrono();
          var newFocusThread = allThreads.length > 0 ? allThreads[allThreads.length - 1]: null
          _currentID = newFocusThread.id
      }
      ThreadStore.emitChange();

    default:
      // do nothing
  }

});

module.exports = ThreadStore;

/**
  APIWeb utils to be used to put a message into firebase DB
**/

var ChatServerActionCreators = require('../actions/ChatServerActionCreators');
var FBRef = new Firebase("https://bertchat.firebaseIO.com");
// !!! Please Note !!!
// We are using localStorage as an example, but in a real-world scenario, this
// would involve XMLHttpRequest, or perhaps a newer client-server protocol.
// The function signatures below might be similar to what you would build, but
// the contents of the functions are just trying to simulate client-server
// communication and server-side processing.

module.exports = {

  getAllMessages: function() {
    // simulate retrieving data from a database
    //var rawMessages = JSON.parse(localStorage.getItem('messages'));

    // retreive message from database

    // this.bertMessagesRef.on("child_added", function(dataSnapshot) {
    //   this.rawMessages.push(dataSnapshot.val());
    //   this.setState({
    //     rawMessages: this.rawMessages //this will need to be changed TODO
    //   });
    // }.bind(this));

    // simulate success callback

    ChatServerActionCreators.receiveAll();
  },


//TODO
//need to change from local storage to some database

  createMessage: function(message, threadName) {
    var messageRef = FBRef.child('messages')
    // simulate writing to a database
    //var rawMessages = JSON.parse(localStorage.getItem('messages'));
    var timestamp = Date.now();
    var id = 'm_' + timestamp;
    var threadID = message.threadID || ('t_' + Date.now());
    var threadName = message.threadName

    var createdMessage = {
      id: id,
      threadID: threadID,
      threadName: threadName,
      authorName: message.authorName,
      text: message.text,
      timestamp: timestamp
    };

    messageRef.push().set({
      threadID: threadID,
      threadName: threadName,
      id: id,
      authorName: message.authorName,
      text: message.text,
      timestamp: timestamp
    });

    //TODO comment this out because we dont need it anymore
    //rawMessages.push(createdMessage);
    //localStorage.setItem('messages', JSON.stringify(rawMessages));

    // simulate success callback
    // setTimeout(function() {
    //   ChatServerActionCreators.receiveCreatedMessage(createdMessage);
    // }, 0);
  }

};

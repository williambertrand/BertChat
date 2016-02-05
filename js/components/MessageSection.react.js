/**
  MessageSection is the component consisting of composer and message list
**/

var React = require('react');

//required components
var MessageComposer = require('./MessageComposer.react');
var MessageListItem = require('./MessageListItem.react');

//Stores relevant to message section
var MessageStore = require('../stores/MessageStore');
var UserStore = require('../stores/UserStore');
var ThreadStore = require('../stores/ThreadStore');

function getStateFromStores() {
  return {
    messages: MessageStore.getAllForCurrentThread(),
    thread: ThreadStore.getCurrent(),
    user: UserStore.getCurrentUser()
  };
}

function getMessageListItem(message) {
  return (
    <MessageListItem
      key={message.id}
      message={message}
    />
  );
}

var MessageSection = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    this._scrollToBottom();
    MessageStore.addChangeListener(this._onChange);
    ThreadStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange)
  },

  componentWillUnmount: function() {
    MessageStore.removeChangeListener(this._onChange);
    ThreadStore.removeChangeListener(this._onChange);
    UserStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var messageListItems = this.state.messages.map(getMessageListItem);
    return (
      <div className="message-section">
        <h3 className="message-thread-heading">{this.state.thread.name}</h3>
        <ul className="message-list" ref="messageList">
          {messageListItems}
        </ul>

        <div className="contatiner">
          <div className="row">
            <div className="col-md-4">
              <p>{this.state.user.firstName}</p>
            </div>
          </div>
          <MessageComposer
            threadID={this.state.thread.id}
          />
        </div>
      </div>
    );
  },


//message added so scroll down
  componentDidUpdate: function() {
    this._scrollToBottom();
  },

  //scroll down by directly accessing the DOM
  _scrollToBottom: function() {
    var ul = this.refs.messageList.getDOMNode();
    ul.scrollTop = ul.scrollHeight;
  },

  /**
   * Event handler for 'change' events coming from the MessageStore
    Called when MessageStore calls emitChange() - if message store changes,
    get the new state for this component from the stores
   */
  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = MessageSection;

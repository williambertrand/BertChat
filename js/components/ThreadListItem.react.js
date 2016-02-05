/*
  ThreadListItem component - each one has the name of the thread,
  the last message of the thread, time of last message,
  and added an X button for deletion of thread
*/

var ChatThreadActionCreators = require('../actions/ChatThreadActionCreators');
var React = require('react');
var classNames = require('classnames');

var ReactPropTypes = React.PropTypes;



var ThreadListItem = React.createClass({

  //thread required for each ThreadListItem
  propTypes: {
    thread: ReactPropTypes.object,
    currentThreadID: ReactPropTypes.string
  },

  render: function() {
    var thread = this.props.thread;
    var lastMessage = thread.lastMessage;
    return (
      <li
        className={classNames({
          'thread-list-item': true,
          'active': thread.id === this.props.currentThreadID,
          'thread-list-item-unread': true
        })}
        onClick={this._onClick}>
        <div className="thread-title">
          <h5 className="thread-name">{thread.name}</h5>
        </div>

        <div className="thread-time">
          {lastMessage.date.toLocaleTimeString()}
        </div>
        <div className="thread-last-message">
          {lastMessage.text}
        </div>
      </li>
    );
  },

  _onClick: function() {
    ChatThreadActionCreators.clickThread(this.props.thread.id);
  },

  //delete the thread - thereby deleting all messages in thread
  _onDeleteClick :function() {
    ChatThreadActionCreators.clickDeleteThread(this.props.thread.id);
  }

});

module.exports = ThreadListItem;

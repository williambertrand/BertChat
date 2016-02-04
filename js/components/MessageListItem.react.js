var React = require('react');

var ReactPropTypes = React.PropTypes;


/**
message list item is basically just a message: its text, time, and sender
**/
var MessageListItem = React.createClass({

  propTypes: {
    message: ReactPropTypes.object
  },

  render: function() {
    var message = this.props.message;
    return (
      <li className="message-list-item">
        <h5 className="message-author-name">{message.authorName}</h5>
        <div className="message-time">
          {message.date.toLocaleTimeString()}
        </div>
        <div className="message-text">{message.text}</div>
      </li>
    );
  }

});

module.exports = MessageListItem;

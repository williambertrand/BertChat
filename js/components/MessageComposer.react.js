/**
  The message composer component consists of a text area and the
  user name setter component
  Add a send button?
**/
var ChatMessageActionCreators = require('../actions/ChatMessageActionCreators');
var UserNameSetter = require('./UserNameSetter.react')
var UserStore = require('../stores/UserStore')
var React = require('react');

var ENTER_KEY_CODE = 13;

var MessageComposer = React.createClass({

  propTypes: {
    threadID: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      text: '',
      userName: ''
    };
  },

  render: function() {
    return (
      <div>
      <textarea
        className="form-control message-composer"
        name="message"
        value={this.state.text}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
      />
    <UserNameSetter />
    </div>
    );
  },

  _onChange: function(event, value) {
    this.setState({text: event.target.value});
  },

  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      var text = this.state.text.trim();
      if (text) {
        ChatMessageActionCreators.createMessage(text, this.props.threadID);
      }
      this.setState({text: ''});
    }
  }

});

module.exports = MessageComposer;

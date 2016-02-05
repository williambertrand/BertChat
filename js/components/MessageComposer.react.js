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
        <div className='row'>
          <div className='col-md-10'>
            <textarea
              className="form-control message-composer"
              name="message"
              value={this.state.text}
              onChange={this._onChange}
              onKeyDown={this._onKeyDown}
            />
          </div>
          <div className='col-md-2'>
            <button className='btn btn-primary'
              onClick={this._onSendClick}>
              Send
            </button>
          </div>
  </div>
    <UserNameSetter />
    </div>
    );
  },

  sendMessage: function(){
    var text = this.state.text.trim();
    if (text) {
      ChatMessageActionCreators.createMessage(text, this.props.threadID);
    }
    this.setState({text: ''});
  },

  _onChange: function(event, value) {
    this.setState({text: event.target.value});
  },

  _onSendClick: function() {
    this.sendMessage();
  },

  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      this.sendMessage();
    }
  }

});

module.exports = MessageComposer;

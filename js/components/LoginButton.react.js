/*
  Button to be used to login a user, or create a new user
  Still working on this
*/

var ChatThreadActionCreators = require('../actions/ChatThreadActionCreators');
var React = require('react');
var classNames = require('classnames');
var ReactPropTypes = React.PropTypes;

var LoginButton = React.createClass({

  propTypes: {
  },

  render: function() {
    return (
      <div className="new-thread-button">
      <button
        className="btn btn-primary"
        onClick={this._onClick}>
        Log In
      </button>
    </div>
    );
  },

  _onClick: function() {
    var timestamp = Date.now();
    //show log in form
  }

});

module.exports = LoginButton;

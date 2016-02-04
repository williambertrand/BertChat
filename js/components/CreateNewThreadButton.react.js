/*
  Button to be used to create a new thread, will be dispalcyed
  at the end of threads in thread section
*/

var ChatThreadActionCreators = require('../actions/ChatThreadActionCreators');
var React = require('react');
var classNames = require('classnames');

var ReactPropTypes = React.PropTypes;

var CreateNewThreadButton = React.createClass({

  propTypes: {
  },

  render: function() {
    return (
      <div className="new-thread-button">
      <button
        className="btn btn-primary"
        id="new-thread"
        onClick={this._onClick}>
        <h5>Create New!</h5>
      </button>
    </div>
    );
  },


  //use action creator to create an action of type THREAD_CREATED
  //which is then dispatched to stores
  _onClick: function() {
    var timestamp = Date.now();
    var newThreadID = "th_" + timestamp;
    ChatThreadActionCreators.createNewThread(newThreadID);
  }

});

module.exports = CreateNewThreadButton;

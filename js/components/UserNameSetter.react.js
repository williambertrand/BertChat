/**
  Used to set username - by chaning the current user in the UserStore
**/

var React = require('react');

var ReactPropTypes = React.PropTypes;
var ENTER_KEY_CODE = 13;

var UserActionCreators = require('../actions/UserActionCreators');

var UserNameSetter = React.createClass({

  getInitialState: function() {
    return {name: ''};
  },

  render : function() {
    return(
      <div className="row">

        <div className="col-md-8">
          <input type="text"
            onChange={this._onChange}
            onKeyDown={this._onKeyDown}
            className="form-control"
            id="name-entry"
            placeholder="Enter your Username"
            value={this.state.name}
          />
        </div>

        <div className="col-md-4">
          <button
            className="btn btn-primary"
            onClick={this._onClick}>
            set
          </button>
        </div>

      </div>
    );
  },

  setUserName : function() {
    var userName = this.state.name.trim();
    if (userName) {
      if (userName === 'bert' || userName === 'Bert') {}
      else {
        var user = {
          firstName: userName,
          lastName: ''
        }

        //send this action to create a change in the user store
        UserActionCreators.setUserName(user);
      }
    }

  },

  _onChange: function(event, value) {
    this.setState({name: event.target.value});
  },

  _onClick: function(event) {
    event.preventDefault();
    this.setUserName();
  },

  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      this.setUserName();
    }
  }

});

module.exports = UserNameSetter;

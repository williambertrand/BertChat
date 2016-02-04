/*
  Currently chat ap ahs header, the thread section, and the message section
  UserNameSetter is part of message section right now but could be
  set apart
*/

var MessageSection = require('./MessageSection.react');
var Header = require('./Header.react');
var React = require('react');
var ThreadSection = require('./ThreadSection.react');
var UserNameSetter = require('./UserNameSetter.react')

var ChatApp = React.createClass({

  render: function() {
    return (
      <div className="chatapp">
        <Header/>
        <ThreadSection />
        <MessageSection />
      </div>
    );
  }

});

module.exports = ChatApp;

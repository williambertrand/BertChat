/*
  Currently chat ap ahs header, the thread section, and the message section
  UserNameSetter is part of message section right now but could be
  set apart
*/

var React = require('react');

var OpenTodos = React.createClass({

  render: function() {
    return (
      <div>

      <div className='row'>

      </div>
        <div className='col-md-4 col-offset-4'>
          <h3>Open TODOs</h3>
          <ul>
            <li>Add deletion of threads</li>
            <li>Add profiles/authentication</li>
            <li>Add private messages</li>
            <li>Change UI</li>
          </ul>
        </div>
      </div>
    );
  }

});

module.exports = OpenTodos;

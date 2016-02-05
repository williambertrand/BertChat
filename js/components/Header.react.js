/**
  Still unimplemented fully
  But this will eventually take care of page control and loginng in/out
*/
var React = require('react');
var LoginButton = require('./LoginButton.react');

var Header = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    return (

      <div>

  <nav className="navbar navbar-default">
  <div className="container-fluid">

    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <p className="navbar-brand"><a href="#/">Bert Chat: Chat with Bert!</a></p>
    </div>

    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav navbar-right">
        <li><a href="#/about">About</a></li>
      </ul>
    </div>

  </div>

</nav>




</div>




    );
  }

});

module.exports = Header;

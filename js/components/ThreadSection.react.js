var React = require('react');

//required components for the thread section
var ThreadListItem = require('../components/ThreadListItem.react');
var CreateNewThreadButton = require('../components/CreateNewThreadButton.react');

//stores that this compnent interacts with
var ThreadStore = require('../stores/ThreadStore');
var UnreadThreadStore = require('../stores/UnreadThreadStore');


//get all the threads- see which thread the user is currently looking at
function getStateFromStores() {
  return {
    threads: ThreadStore.getAllChrono(),
    currentThreadID: ThreadStore.getCurrentID(),
    unreadCount: UnreadThreadStore.getCount() //this isn't really implemented
  };
}

//thread section to left of message section.
//in progress
var ThreadSection = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  //add listeners to the stores on mounting the component
  componentDidMount: function() {
    ThreadStore.addChangeListener(this._onChange);
    UnreadThreadStore.addChangeListener(this._onChange);
  },

  //component unmounted->remove thread store listeners
  componentWillUnmount: function() {
    ThreadStore.removeChangeListener(this._onChange);
    UnreadThreadStore.removeChangeListener(this._onChange);
  },

  render: function() {

    var threadListItems = this.state.threads.map(function(thread) {
      return (
        <div>
          <ThreadListItem
            key={thread.id}
            thread={thread}
            currentThreadID={this.state.currentThreadID}
          />
        </div>
      );
    }, this);

    var unread =
      this.state.unreadCount === 0 ?
      null :
      <span>Unread threads: {this.state.unreadCount}</span>;
    return (
      <div className="thread-section">
        <div className="thread-count">
          {unread}
        </div>
        <ul className="thread-list">
          {threadListItems}
          </ul>
          <CreateNewThreadButton />
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the stores
    Called whenerver store calls emitChange()
   */
  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = ThreadSection;

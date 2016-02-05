// This file bootstraps the entire application.

var ChatApp = require('./components/ChatApp.react');
var AboutPage = require('./components/AboutPage.react');
var ChatExampleData = require('./ChatExampleData');
var ChatWebAPIUtils = require('./utils/ChatWebAPIUtils');
var React = require('react');

window.React = React; // export for http://fb.me/react-devtools


//TODO get initial data from database?
ChatExampleData.init(); // load example data into localstorage

ChatWebAPIUtils.getAllMessages();

// React.render(
//     <ChatApp />,
//     document.getElementById('react')
// );
//
//

const routes = {
  '/':      <ChatApp />,
  '/about': <AboutPage />
};

const container = document.getElementById('react');

function render() {
  try {
    const path = window.location.hash.substr(1) || '/';
    const component = routes[path];
    React.render(component, container);
  } catch (err) {
    React.render(<ErrorPage {...err} />, container);
  }
}

window.addEventListener('hashchange', () => render());

render();

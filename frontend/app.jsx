const React = require('react');
const ReactDOM = require('react-dom');
const Util = require('./util/util');
const Store = require('./stores/store');

var App = React.createClass({
  render() {
    return (
      <div>Hello world</div>
    );
  }
});

debugger

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.getElementById("root"));
});

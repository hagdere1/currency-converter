var React = require('react'),
    ReactDOM = require('react-dom'),
    Util = require('./util/util'),
    RateStore = require('./stores/store');

var App = React.createClass({
  render: function () {
    return (
      <div>Hello world</div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<App />, document.getElementById("root"));
});

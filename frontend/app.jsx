var React = require('react'),
    ReactDOM = require('react-dom'),
    Calculator = require('./components/calculator');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <ul>
          <li><a href="">Portfolio</a></li>
          <li><a href="">GitHub</a></li>
          <li><a href="">LinkedIn</a></li>
        </ul>
        <Calculator />
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<App />, document.getElementById("root"));
});

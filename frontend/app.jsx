var React = require('react'),
    ReactDOM = require('react-dom'),
    Calculator = require('./components/calculator');

var App = React.createClass({
  render: function () { 
    return (
      <div>
        <ul>
          <li><a href="http://haikgregoryagdere.com/">Portfolio</a></li>
          <li><a href="https://github.com/hagdere1">GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/hgagdere">LinkedIn</a></li>
        </ul>
        <Calculator />
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<App />, document.getElementById("root"));
});

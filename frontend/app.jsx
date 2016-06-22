const React = require('react');
const ReactDOM = require('react-dom');

var App = React.createClass({
  render() {
    return (
      <div>Hello world</div>
    );
  }
})

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.getElementById("root"));
});

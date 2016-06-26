var React = require('react'),
    ReactDOM = require('react-dom'),
    Util = require('./util/util'),
    RateStore = require('./stores/store');

var App = React.createClass({
  getInitialState: function () {
    return {
      rates: RateStore.all(),
      amount: "",
      from: "USD",
      to: "USD",
      convertedAmount: null
    };
  },

  componentDidMount: function () {
    Util.fetchExchangeRates();
    this.exchangeRateListener = RateStore.addListener(this.onChange);
  },

  componentWillUnmount: function () {
    this.exchangeRateListener.remove();
  },

  onChange: function () {
    this.setState({ rates: RateStore.all() });
    if (this.state.rates.length === 0 || this.ratesOutdated()) {
      debugger
      Util.updateExchangeRates();
    }
  },

  setFromCurrency: function (e) {
    this.setState({ from: e.target.value });
  },

  setToCurrency: function (e) {
    this.setState({ to: e.target.value });
  },

  setAmount: function (e) {
    this.setState({ amount: e.target.value });
  },

  ratesOutdated: function () {
    var currentDate = new Date(),
        previousDate = new Date(this.state.rates[0].created_at);

    return Math.floor((currentDate - previousDate) / 1000 / 60 / 60) >= 24;
  },

  calculate: function (e) {
    e.preventDefault();
    // Set from and to rates to USD by default
    var fromRate = 1,
        toRate = 1,
        amount = this.state.amount;
debugger
    if (amount === "") {
      this.setState({ convertedAmount: 0, amount: "" });
      return;
    } else if (isNaN(amount) || amount < 0) {
      this.setState({ convertedAmount: "Please enter a valid number.", amount: "" });
      return;
    }

    this.state.rates.forEach(function (rate) {
      if (rate.currency === this.state.from) {
        fromRate = parseFloat(rate.rate);
      } else if (rate.currency === this.state.to) {
        toRate = parseFloat(rate.rate);
      }
    }.bind(this));

    this.setState({ convertedAmount: (1 / fromRate) * parseFloat(amount) * toRate });
  },

  render: function () {
    var convertedAmount;
    if (this.state.convertedAmount) {
      convertedAmount = this.state.convertedAmount;
    } else {
      convertedAmount = <div></div>;
    }

    var fromCurrencies = RateStore.all().map(function (fromRate) {
      return <option value={fromRate.currency} key={fromRate.id}>{fromRate.currency}</option>;
    }.bind(this));

    var toCurrencies = RateStore.all().map(function (toRate) {
      return <option value={toRate.currency} key={toRate.id}>{toRate.currency}</option>;
    }.bind(this));

    return (
      <div>
        <h1>Currency Calculator</h1>
        <form onSubmit={this.calculate}>

          <label>From</label>
          <select onChange={this.setFromCurrency} value={this.state.from}>
            <option value="USD">USD</option>;
            {fromCurrencies}
          </select>

          <label>To</label>
          <select onChange={this.setToCurrency} value={this.state.to}>
            <option value="USD">USD</option>;
            {toCurrencies}
          </select>

          <input type="text" onChange={this.setAmount} value={this.state.amount} />

          <button>Convert</button>
        </form>

        {convertedAmount}
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<App />, document.getElementById("root"));
});

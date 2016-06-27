var React = require('react'),
    Util = require('../util/util'),
    RateStore = require('../stores/store');

var Calculator = React.createClass({
  getInitialState: function () {
    return {
      rates: RateStore.all(),
      amount: "",
      from: "USD",
      to: "USD",
      value: null
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

    // Fetch new dates from Fixer API if local rates more than a day old
    return Math.floor((currentDate - previousDate) / 1000 / 60 / 60) >= 24;
  },

  calculate: function (e) {
    e.preventDefault();
    // Set from and to rates to USD by default
    var fromRate = 1,
        toRate = 1,
        amount = this.state.amount,
        value;

    if (amount === "") {
      this.setState({ value: 0, amount: "" });
      return;
    } else if (amount < 0) {
      this.setState({ value: "Cannot enter a negative value.", amount: "" });
      return;
    }

    // Find rates corresponing to the selected currencies
    this.state.rates.forEach(function (rate) {
      if (rate.currency === this.state.from) {
        fromRate = parseFloat(rate.rate);
      } else if (rate.currency === this.state.to) {
        toRate = parseFloat(rate.rate);
      }
    }.bind(this));

    value = this.state.amount + " " + this.state.from + " " + "=" + " " +
            ((1 / fromRate) * amount * toRate).toFixed(2) + " " + this.state.to;

    this.setState({ value: value });
  },

  render: function () {
    var value;
    if (this.state.value) {
      value = <div id="value">{this.state.value}</div>;
    } else {
      value = <div id="value">-</div>;
    }

    var fromCurrencies = RateStore.all().map(function (fromRate) {
      return <option value={fromRate.currency} key={fromRate.id}>{fromRate.currency}</option>;
    }.bind(this));

    var toCurrencies = RateStore.all().map(function (toRate) {
      return <option value={toRate.currency} key={toRate.id}>{toRate.currency}</option>;
    }.bind(this));

    return (
      <div id="container">
        <div id="header_banner">
          <h1>Currency Converter</h1>
        </div>
        <div id="calculator">
          <form className="group" onSubmit={this.calculate}>
            <div className="currency_menus group">
              <div className="dropdown">
                <label>From</label>
                <select id="from_currency" onChange={this.setFromCurrency} value={this.state.from}>
                  <option value="USD">USD</option>;
                    {fromCurrencies}
                </select>
              </div>
              <div className="dropdown">
                <label>To</label>
                <select id="to_currency" onChange={this.setToCurrency} value={this.state.to}>
                  <option value="USD">USD</option>;
                  {toCurrencies}
                </select>
              </div>
            </div>
            <input type="number"
                   onChange={this.setAmount}
                   value={this.state.amount}
                   placeholder="Amount"
                   step="any"/>
            <button>Convert</button>
          </form>
          {value}
        </div>
      </div>
    );
  }
});

module.exports = Calculator;

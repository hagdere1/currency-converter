var Actions = require('../actions/actions'),
    _rates = [];

var Util = {
  fetchExchangeRates: function () {
    $.ajax({
      url: "api/exchange_rates",
      type: "GET",
      dataType: "json",
      success: function (rates) {
        Actions.receiveRates(rates);
      }
    });
  },

  createExchangeRate: function (rate) {
    $.ajax({
      url: "api/exchange_rates",
      type: "post",
      dataType: "json",
      data: { exchange_rate: rate },
      success: function (exchangeRate) {
        _rates.push(exchangeRate);
        if (_rates.length === 31) {
          Actions.receiveRates(_rates);
          _rates = [];
        }
      },
      error: function () {
        console.log("Failed to save exchange rates.");
      }
    });
  },

  updateExchangeRates: function () {
    $.ajax({
      url: "http://api.fixer.io/latest?base=USD",
      type: "GET",
      dataType: "jsonp",
      success: function (data) {
        console.log(data);
        for (var exchangeRate in data.rates) {
          var rate = {};
          rate.date = data.date;
          rate.rate = data.rates[exchangeRate];
          rate.currency = exchangeRate;
          Util.createExchangeRate(rate);
        }
      }
    });
  },
};

module.exports = Util;
window.Util = Util;

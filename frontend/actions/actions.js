var Dispatcher = require('../dispatcher/dispatcher');

module.exports = {
  receiveRates: function (rates) {
    Dispatcher.dispatch({ rates: rates });
  }
};

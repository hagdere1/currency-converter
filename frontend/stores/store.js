var Dispatcher = require('../dispatcher/dispatcher'),
    Store = require('flux/utils').Store,
    RateStore = new Store(Dispatcher),
    _exchangeRates = [];

var resetRates = function (rates) {
  _exchangeRates = rates;
};

RateStore.all = function () {
  return _exchangeRates.slice();
};

RateStore.findRateById = function (id) {
  _exchangeRates.forEach(function (rate) {
    if (rate.id === id) {
      return rate;
    }
  });
};

RateStore.__onDispatch = function (payload) {
  resetRates(payload.rates);
  RateStore.__emitChange();
};

module.exports = RateStore;

'use strict';

(function () {
  var PriceRange = {
    low: {
      min: 0,
      max: 10000
    },
    middle: {
      min: 10000,
      max: 50000
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };

  var mapFilter = document.querySelector('.map__filters');
  var mapFilterType = mapFilter.querySelector('#housing-type');
  var mapFilterPrice = mapFilter.querySelector('#housing-price');
  var mapFilterRoom = mapFilter.querySelector('#housing-rooms');
  var mapFilterGuest = mapFilter.querySelector('#housing-guests');
  var mapFilterFeature = mapFilter.querySelector('#housing-features');

  var filterMap = function (filteredElement) {
    return filteredElement.filter(function (el) {
      if (mapFilterType.value === 'any') {
        return true;
      }

      return el.offer.type === mapFilterType.value;
    })
    .filter(function (el) {
      if (mapFilterPrice.value === 'any') {
        return true;
      }

      if ((PriceRange[mapFilterPrice.value].min < el.offer.price) && (el.offer.price < PriceRange[mapFilterPrice.value].max)) {
        return true;
      }

      return false;
    })
    .filter(function (el) {
      if (mapFilterRoom.value === 'any') {
        return true;
      }

      return el.offer.rooms === parseInt(mapFilterRoom.value, 10);
    })
    .filter(function (el) {
      if (mapFilterGuest.value === 'any') {
        return true;
      }
      return el.offer.guests === parseInt(mapFilterGuest.value, 10);
    })
    .filter(function (el) {
      return filterFeatures(mapFilterFeature).every(function (element) {
        return el.offer.features.includes(element.value);
      });
    })
    .slice(0, window.PINS_LIMIT);
  };

  var filterFeatures = function (features) {
    features = Array.from(features.querySelectorAll('input'));
    var featuresChecked = features.filter(function (feature) {
      return feature.checked;
    });
    return featuresChecked;
  };

  var updateAdverts = function () {
    var filteredElement = filterMap(window.pins);

    // window.deleteCard();
    var pins = document.querySelectorAll('.map__pin');
    for (var i = 1; i < pins.length; i++) {
      pins[i].remove();
    }
    window.renderPins(filteredElement);
  };

  mapFilterType.addEventListener('change', function () {
    window.debounce(updateAdverts)();
  });

  mapFilterPrice.addEventListener('change', function () {
    window.debounce(updateAdverts)();
  });

  mapFilterRoom.addEventListener('change', function () {
    window.debounce(updateAdverts)();
  });

  mapFilterGuest.addEventListener('change', function () {
    window.debounce(updateAdverts)();
  });
  mapFilterFeature.addEventListener('change', function () {
    window.debounce(updateAdverts)();
  });
})();

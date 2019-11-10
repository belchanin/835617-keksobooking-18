'use strict';

(function () {
  var PriceRange = {
    LOW: {
      min: 0,
      max: 10000
    },
    MIDDLE: {
      min: 10000,
      max: 50000
    },
    HIGH: {
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

  var filterFeatures = function (features) {
    features = Array.from(features.querySelectorAll('input'));
    var featuresChecked = features.filter(function (feature) {
      return feature.checked;
    });
    return featuresChecked;
  };

  var filterMap = function (filteredElement) {
    return filteredElement.filter(function (element) {
      return (mapFilterType.value === 'any' ? true : element.offer.type === mapFilterType.value);
    })
    .filter(function (element) {
      return (mapFilterPrice.value === 'any' || (PriceRange[mapFilterPrice.value.toUpperCase()].min < element.offer.price) && (element.offer.price < PriceRange[mapFilterPrice.value.toUpperCase()].max));
    })
    .filter(function (element) {
      return (mapFilterRoom.value === 'any') ? true : element.offer.rooms === parseInt(mapFilterRoom.value, 10);
    })
    .filter(function (element) {
      return (mapFilterGuest.value === 'any') ? true : element.offer.guests === parseInt(mapFilterGuest.value, 10);
    })
    .filter(function (element) {
      return filterFeatures(mapFilterFeature).every(function (filterElement) {
        return element.offer.features.includes(filterElement.value);
      });
    })
    .slice(0, window.pin.PINS_QUANTITY);
  };

  var updateAdverts = function () {
    var filteredElement = filterMap(window.main.pins);
    var openedCard = document.querySelector('.map__card');
    if (openedCard) {
      window.pin.deleteCard(openedCard);
    }
    var pins = document.querySelectorAll('.map__pin');

    pins.forEach(function (element) {
      if (!element.classList.contains('map__pin--main')) {
        element.remove();
      }
    });
    window.pin.renderPins(filteredElement);
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

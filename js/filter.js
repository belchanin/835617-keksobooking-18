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

  var filterType = function (element) {
    return (mapFilterType.value === 'any' ? true : element.offer.type === mapFilterType.value);
  };

  var filterPrice = function (element) {
    return (mapFilterPrice.value === 'any' || (PriceRange[mapFilterPrice.value.toUpperCase()].min < element.offer.price) && (element.offer.price < PriceRange[mapFilterPrice.value.toUpperCase()].max));
  };

  var filterRoom = function (element) {
    return (mapFilterRoom.value === 'any') ? true : element.offer.rooms === parseInt(mapFilterRoom.value, 10);
  };

  var filterGuest = function (element) {
    return (mapFilterGuest.value === 'any') ? true : element.offer.guests === parseInt(mapFilterGuest.value, 10);
  };

  var filterFeaturesElement = function (element) {
    return filterFeatures(mapFilterFeature).every(function (filterElement) {
      return element.offer.features.includes(filterElement.value);
    });
  };

  var filterMap = function (filteredElement) {
    return filteredElement.filter(function (element) {
      return filterType(element) &&
             filterPrice(element) &&
             filterRoom(element) &&
             filterGuest(element) &&
             filterFeaturesElement(element);
    }).slice(0, window.pin.QUANTITY);
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
    window.pin.render(filteredElement);
  };

  mapFilter.addEventListener('change', function () {
    window.debounce(updateAdverts)();
  });
})();

'use strict';

(function () {
  var adFormChildren = window.util.adForm.children;
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapFilters = map.querySelector('.map__filters');
  var mapFiltersChildren = mapFilters.children;
  var addressInput = window.util.adForm.querySelector('input[name = "address"]');
  var housingType = map.querySelector('#housing-type');

  var MAIN_PIN_TAIL_HEIGHT = 22;
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 62;

  var pins = [];

  var setDisabledAttributes = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', 'disabled');
    }
  };

  var removeDisabledAttributes = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }
  };

  var getRank = function (pin) {
    var rank = 0;

    if (pin.offer.type === housingType.value) {
      rank += 1;
    }

    return rank;
  };

  var updateMap = function (pinData) {
    window.renderPins(pinData.sort(function (left, right) {
      return getRank(right) - getRank(left);
    }));
  };

  var successGetHandler = function (pinData) {
    pins = pinData;
    updateMap(pins);
  };

  var errorHandler = function (errorMessage) {
    var errorBlock = document.querySelector('#error').content;
    var errorText = errorBlock.querySelector('.error__message');

    errorText.textContent = errorMessage;
    document.querySelector('main').appendChild(errorBlock);
  };

  var changePageState = function () {
    map.classList.remove('map--faded');
    window.backend.load(successGetHandler, errorHandler);
    window.util.adForm.classList.remove('ad-form--disabled');
    removeDisabledAttributes(adFormChildren);
    removeDisabledAttributes(mapFiltersChildren);

    addressInput.value = (Math.floor(MAIN_PIN_WIDTH / 2) + parseInt(mapPinMain.style.left, 10)) + ', ' + (MAIN_PIN_HEIGHT + parseInt(mapPinMain.style.top, 10) + MAIN_PIN_TAIL_HEIGHT);
  };

  setDisabledAttributes(adFormChildren);
  setDisabledAttributes(mapFiltersChildren);

  addressInput.value = (Math.floor(MAIN_PIN_WIDTH / 2) + parseInt(mapPinMain.style.left, 10)) + ', ' + (Math.floor(MAIN_PIN_HEIGHT / 2) + parseInt(mapPinMain.style.top, 10));

  mapPinMain.addEventListener('mousedown', function () {
    changePageState();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      changePageState();
    }
  });

  housingType.addEventListener('change', function () {
    updateMap(pins);
  });
})();

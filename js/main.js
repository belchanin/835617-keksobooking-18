'use strict';

(function () {
  var MAIN_PIN_TAIL_HEIGHT = 15;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MIN_MAP_HEIGHT = 130;
  var MAX_MAP_HEIGHT = 630;

  var adForm = document.querySelector('.ad-form');
  var adFormChildren = adForm.children;
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapFilter = map.querySelector('.map__filters');
  var mapFiltersChildren = mapFilter.children;
  var addressInput = adForm.querySelector('input[name = "address"]');
  var housingType = map.querySelector('#housing-type');
  var mapPins = map.querySelector('.map__pins');
  var pins = [];
  var mapDisabled = true;

  var limitXCoords = function (x) {
    var start = mapPins.offsetLeft - mapPinMain.offsetWidth / 2;
    var end = mapPins.offsetLeft + mapPins.offsetWidth - mapPinMain.offsetWidth / 2;

    if (x < start) {
      return start;
    }
    if (x > end) {
      return end;
    }
    return x;
  };

  var limitYCoords = function (y) {
    var start = mapPins.offsetTop + MIN_MAP_HEIGHT - MAIN_PIN_HEIGHT - MAIN_PIN_TAIL_HEIGHT;
    var end = mapPins.offsetTop + MAX_MAP_HEIGHT - MAIN_PIN_HEIGHT - MAIN_PIN_TAIL_HEIGHT;
    if (y < start) {
      return start;
    }
    if (y > end) {
      return end;
    }
    return y;
  };

  var calculatePinCoordinates = function () {
    return (Math.floor(MAIN_PIN_WIDTH / 2) + parseInt(mapPinMain.style.left, 10)) + ', ' + (MAIN_PIN_HEIGHT + parseInt(mapPinMain.style.top, 10) + MAIN_PIN_TAIL_HEIGHT);
  };

  var setDisabledAttributes = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = 'disabled';
    }
  };

  var removeDisabledAttributes = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }
  };

  var successGetHandler = function (pinData) {
    window.main.pins = pinData;
    window.pin.renderPins(window.main.pins);
  };

  var errorHandler = function (errorMessage) {
    var errorBlock = document.querySelector('#error').content;
    var errorText = errorBlock.querySelector('.error__message');

    errorText.textContent = errorMessage;
    document.querySelector('main').appendChild(errorBlock);
  };

  var changePageState = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    removeDisabledAttributes(adFormChildren);
    removeDisabledAttributes(mapFiltersChildren);
    window.validateRoomsForGuests();

    if (window.main.mapDisabled) {
      window.backend.load(successGetHandler, errorHandler);
    }

    window.main.mapDisabled = false;
    addressInput.value = calculatePinCoordinates();
  };

  setDisabledAttributes(adFormChildren);
  setDisabledAttributes(mapFiltersChildren);

  addressInput.value = calculatePinCoordinates();

  var mapPinMainEnterPressHandler = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      changePageState();
    }

    mapPinMain.removeEventListener('keydown', mapPinMainEnterPressHandler);
  };

  mapPinMain.addEventListener('keydown', mapPinMainEnterPressHandler);

  housingType.addEventListener('change', function () {
    window.pin.renderPins(window.main.pins);
  });

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var pinMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = limitYCoords(mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = limitXCoords(mapPinMain.offsetLeft - shift.x) + 'px';
      addressInput.value = calculatePinCoordinates();
    };

    var pinMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      changePageState();
      addressInput.value = calculatePinCoordinates();

      document.removeEventListener('mousemove', pinMouseMoveHandler);
      document.removeEventListener('mouseup', pinMouseUpHandler);

      if (dragged) {
        var clickPreventDefaultHandler = function (clickEvt) {
          clickEvt.preventDefault();
          mapPinMain.removeEventListener('click', clickPreventDefaultHandler);
        };
        mapPinMain.addEventListener('click', clickPreventDefaultHandler);
      }
    };

    document.addEventListener('mousemove', pinMouseMoveHandler);
    document.addEventListener('mouseup', pinMouseUpHandler);
  });

  window.main = {
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    mapPinMain: mapPinMain,
    pins: pins,
    mapDisabled: mapDisabled,
    calculatePinCoordinates: calculatePinCoordinates,
    setDisabledAttributes: setDisabledAttributes,
  };
})();

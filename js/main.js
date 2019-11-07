'use strict';

(function () {
  var MAIN_PIN_TAIL_HEIGHT = 22;
  window.MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 62;
  var MIN_MAP_HEIGHT = 130;
  var MAX_MAP_HEIGHT = 630;

  var adForm = document.querySelector('.ad-form');
  var adFormChildren = adForm.children;
  var map = document.querySelector('.map');
  window.mapPinMain = map.querySelector('.map__pin--main');
  var mapFilter = map.querySelector('.map__filters');
  var mapFiltersChildren = mapFilter.children;
  var addressInput = adForm.querySelector('input[name = "address"]');
  var housingType = map.querySelector('#housing-type');
  var mapPins = map.querySelector('.map__pins');

  var limitXCoords = function (x) {
    var start = mapPins.offsetLeft - window.mapPinMain.offsetWidth / 2;
    var end = mapPins.offsetLeft + mapPins.offsetWidth - window.mapPinMain.offsetWidth / 2;

    if (x < start) {
      return start;
    }
    if (x > end) {
      return end;
    }
    return x;
  };

  var limitYCoords = function (y) {
    var start = mapPins.offsetTop + MIN_MAP_HEIGHT - window.mapPinMain.offsetHeight - MAIN_PIN_TAIL_HEIGHT;
    var end = mapPins.offsetTop + MAX_MAP_HEIGHT - MAIN_PIN_TAIL_HEIGHT;
    if (y < start) {
      return start;
    }
    if (y > end) {
      return end;
    }
    return y;
  };

  window.calculatePinCoordinates = function () {
    return (Math.floor(window.MAIN_PIN_WIDTH / 2) + parseInt(window.mapPinMain.style.left, 10)) + ', ' + (MAIN_PIN_HEIGHT + parseInt(window.mapPinMain.style.top, 10) + MAIN_PIN_TAIL_HEIGHT);
  };

  window.setDisabledAttributes = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', 'disabled');
    }
  };

  var removeDisabledAttributes = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }
  };

  var successGetHandler = function (pinData) {
    window.pins = pinData;
    window.renderPins(window.pins);
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
    adForm.classList.remove('ad-form--disabled');
    removeDisabledAttributes(adFormChildren);
    removeDisabledAttributes(mapFiltersChildren);
    window.validateRoomsForGuests();

    addressInput.value = window.calculatePinCoordinates();
  };

  window.setDisabledAttributes(adFormChildren);
  window.setDisabledAttributes(mapFiltersChildren);

  addressInput.value = window.calculatePinCoordinates();

  window.mapPinMain.addEventListener('click', function () {
    changePageState();
  });

  window.mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      changePageState();
    }
  });

  housingType.addEventListener('change', function () {
    window.renderPins(window.pins);
  });

  window.mapPinMain.addEventListener('mousedown', function (evt) {
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

      window.mapPinMain.style.top = limitYCoords(window.mapPinMain.offsetTop - shift.y) + 'px';
      window.mapPinMain.style.left = limitXCoords(window.mapPinMain.offsetLeft - shift.x) + 'px';
      addressInput.value = window.calculatePinCoordinates();
    };

    var pinMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      addressInput.value = window.calculatePinCoordinates();

      document.removeEventListener('mousemove', pinMouseMoveHandler);
      document.removeEventListener('mouseup', pinMouseUpHandler);

      if (dragged) {
        var clickPreventDefaultHandler = function (clickEvt) {
          clickEvt.preventDefault();
          window.mapPinMain.removeEventListener('click', clickPreventDefaultHandler);
        };
        window.mapPinMain.addEventListener('click', clickPreventDefaultHandler);
      }
    };

    document.addEventListener('mousemove', pinMouseMoveHandler);
    document.addEventListener('mouseup', pinMouseUpHandler);
  });
})();

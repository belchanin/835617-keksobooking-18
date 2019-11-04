'use strict';

(function () {
  var adFormSubmit = window.util.adForm.querySelector('.ad-form__submit');
  var mainContent = document.querySelector('main');
  var room = window.util.adForm.querySelector('[name = "rooms"]');
  var guest = window.util.adForm.querySelector('[name= "capacity"]');
  var houseType = window.util.adForm.querySelector('[name= "type"]');
  var price = window.util.adForm.querySelector('[name= "price"]');
  var timeIn = window.util.adForm.querySelector('[name= "timein"]');
  var timeOut = window.util.adForm.querySelector('[name= "timeout"]');
  var formTitle = window.util.adForm.querySelector('#title');
  var formDescription = window.util.adForm.querySelector('#description');
  var map = document.querySelector('.map');
  var mapFilters = map.querySelector('.map__filters');
  var mapFiltersChildren = mapFilters.children;
  var adFormChildren = window.util.adForm.children;
  var addressInput = window.util.adForm.querySelector('input[name = "address"]');

  var changeTimeOption = function (first, second) {
    switch (true) {
      case (first.value === '12:00'): second.value = '12:00';
        break;
      case (first.value === '13:00'): second.value = '13:00';
        break;
      case (first.value === '14:00'): second.value = '14:00';
        break;
    }
    return true;
  };

  timeIn.addEventListener('change', function () {
    changeTimeOption(timeIn, timeOut);
  });

  timeOut.addEventListener('change', function () {
    changeTimeOption(timeOut, timeIn);
  });

  var priceForHouseType = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };

  houseType.addEventListener('change', function () {
    price.setAttribute('placeholder', priceForHouseType[houseType.value]);
    price.setAttribute('min', priceForHouseType[houseType.value]);
  });

  var validateRoomsForGuests = function () {
    var roomsForGuests = {
      '1': {
        'guests': [1],
        'error': '1 комната для одного гостя'
      },

      '2': {
        'guests': [1, 2],
        'error': '2 комнаты для 1 или 2 гостей'
      },

      '3': {
        'guests': [1, 2, 3],
        'error': '3 комнаты для 1, 2 или 3 гостей'
      },

      '100': {
        'guests': [0],
        'error': '100 комнат не для гостей'
      }
    };

    var roomSelected = room.value;
    var guestSelected = guest.value;
    return guest.setCustomValidity(roomsForGuests[roomSelected].guests.includes(guestSelected) ? '' : roomsForGuests[roomSelected].error);
  };

  adFormSubmit.addEventListener('submit', function () {
    validateRoomsForGuests();
  });

  var form = window.util.adForm;

  var hideSuccessBlockClickHandler = function () {
    var successBlock = document.querySelector('.success');
    form.removeChild(successBlock);
  };

  var hideErrorBlockClickHandler = function () {
    var errorBlock = document.querySelector('.error');
    mainContent.removeChild(errorBlock);
  };

  var resetMap = function () {
    map.classList.add('map--faded');
    var pins = document.querySelectorAll('.map__pin');
    for (var i = 1; i < pins.length; i++) {
      pins[i].remove();
    }

    window.mapPinMain.style.top = map.offsetHeight / 2 + 'px';
    window.mapPinMain.style.left = map.offsetWidth / 2 - window.MAIN_PIN_WIDTH / 2 + 'px';

    addressInput.value = window.calculatePinCoordinates();
  };

  var resetPageState = function () {
    window.util.adForm.classList.add('ad-form--disabled');
    window.setDisabledAttributes(adFormChildren);
    window.setDisabledAttributes(mapFiltersChildren);
    price.value = '';
    formTitle.value = '';
    formDescription.value = '';

    resetMap();
  };

  var successPostHandler = function () {
    var success = document.querySelector('#success').content;
    var node = success.cloneNode(true);

    form.appendChild(node);
    var successBlock = document.querySelector('.success');

    successBlock.addEventListener('click', hideSuccessBlockClickHandler);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        hideSuccessBlockClickHandler();
      }
    });

    resetPageState();
  };

  var errorHandler = function () {
    var error = document.querySelector('#error').content;
    var node = error.cloneNode(true);

    mainContent.appendChild(node);
    var errorBlock = document.querySelector('.error');
    var closeErrorButton = errorBlock.querySelector('.error__button');

    closeErrorButton.addEventListener('click', hideErrorBlockClickHandler);
    errorBlock.addEventListener('click', hideErrorBlockClickHandler);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        hideErrorBlockClickHandler();
      }
    });
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), successPostHandler, errorHandler);
    evt.preventDefault();
  });
})();

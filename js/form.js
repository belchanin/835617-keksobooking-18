'use strict';

(function () {
  var DEFAULT_PRICE_PLACEHOLDER = '1000';
  var DEFAULT_HOUSE_TYPE = 'flat';
  var DEFAULT_TIME = '12:00';
  var DEFAULT_GUEST_QUANTITY = '3';
  var DEFAULT_ROOM_QUANTITY = '1';
  var DEFAULT_IMG_PREVIEW_SRC = 'img/muffin-grey.svg';

  var adForm = document.querySelector('.ad-form');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var adFormHeaderPreview = adForm.querySelector('.ad-form-header__preview img');
  var mainContent = document.querySelector('main');
  var room = adForm.querySelector('[name = "rooms"]');
  var guest = adForm.querySelector('[name= "capacity"]');
  var houseType = adForm.querySelector('[name= "type"]');
  var price = adForm.querySelector('[name= "price"]');
  var timeIn = adForm.querySelector('[name= "timein"]');
  var timeOut = adForm.querySelector('[name= "timeout"]');
  var formTitle = adForm.querySelector('#title');
  var formDescription = adForm.querySelector('#description');
  var map = document.querySelector('.map');
  var mapFilters = map.querySelector('.map__filters');
  var mapFiltersChildren = mapFilters.children;
  var adFormChildren = adForm.children;
  var addressInput = adForm.querySelector('input[name = "address"]');
  var formFeatures = adForm.querySelector('.features').querySelectorAll('input');

  var PriceForHouseType = {
    BUNGALO: '0',
    FLAT: '1000',
    HOUSE: '5000',
    PALACE: '10000'
  };

  var ARRIVAL_TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var RoomsForGuests = {
    '1': [1],
    '2': [1, 2],
    '3': [1, 2, 3],
    '100': [0],
  };

  window.validateRoomsForGuests = function () {
    var guestsAmount = RoomsForGuests[room.value];
    var capacityOptions = guest.querySelectorAll('option');

    capacityOptions.forEach(function (it) {
      it.disabled = true;
      it.selected = false;
      guestsAmount.forEach(function (amount) {
        if (+it.value === amount) {
          it.disabled = false;
          it.selected = true;
        }
      });
    });
  };

  var changeTimeOption = function (selectedTimeIn, selectedTimeOut) {
    ARRIVAL_TIMES.forEach(function (arrivalTime) {
      if (selectedTimeIn.value === arrivalTime) {
        selectedTimeOut.value = arrivalTime;
      }
    });
  };

  var hideSuccessBlockClickHandler = function () {
    var successBlock = document.querySelector('.success');
    successBlock.remove();
  };

  var hideErrorBlockClickHandler = function () {
    var errorBlock = document.querySelector('.error');
    errorBlock.remove();
  };

  var resetMap = function () {
    map.classList.add('map--faded');
    var pins = document.querySelectorAll('.map__pin');
    pins.forEach(function (element) {
      if (!element.classList.contains('map__pin--main')) {
        element.remove();
      }
    });
    var openedCard = document.querySelector('.map__card');
    if (openedCard) {
      window.pin.deleteCard(openedCard);
    }

    window.main.bigPin.style.top = map.offsetHeight / 2 + 'px';
    window.main.bigPin.style.left = map.offsetWidth / 2 - window.main.BIG_PIN_WIDTH / 2 + 'px';

    addressInput.value = window.main.calculatePinCoordinates();
  };

  var resetFilter = function () {
    var mapFilter = document.querySelector('.map__filters');
    var mapFilterType = mapFilter.querySelector('#housing-type');
    var mapFilterPrice = mapFilter.querySelector('#housing-price');
    var mapFilterRoom = mapFilter.querySelector('#housing-rooms');
    var mapFilterGuest = mapFilter.querySelector('#housing-guests');
    var mapFilterFeatures = mapFilter.querySelectorAll('#housing-features input');

    mapFilterType.value = 'any';
    mapFilterPrice.value = 'any';
    mapFilterRoom.value = 'any';
    mapFilterGuest.value = 'any';
    mapFilterFeatures.forEach(function (it) {
      it.checked = false;
    });
  };

  var resetPageState = function () {
    var adFormPhotos = adForm.querySelectorAll('.ad-form__photo img');

    formTitle.value = '';
    formDescription.value = '';
    price.value = '';
    formTitle.value = '';
    formDescription.value = '';
    price.placeholder = DEFAULT_PRICE_PLACEHOLDER;
    houseType.value = DEFAULT_HOUSE_TYPE;
    timeIn.value = DEFAULT_TIME;
    timeOut.value = DEFAULT_TIME;
    guest.value = DEFAULT_GUEST_QUANTITY;
    room.value = DEFAULT_ROOM_QUANTITY;
    adFormHeaderPreview.src = DEFAULT_IMG_PREVIEW_SRC;
    if (adFormPhotos) {
      adFormPhotos.forEach(function (photo) {
        photo.remove();
      });
    }
    formFeatures.forEach(function (feature) {
      feature.checked = false;
    });

    adForm.classList.add('ad-form--disabled');
    window.main.setDisabledAttributes(adFormChildren);
    window.main.setDisabledAttributes(mapFiltersChildren);

    resetFilter();
    resetMap();
    window.main.mapDisabled = true;
  };

  var successPostHandler = function () {
    var success = document.querySelector('#success').content;
    var node = success.cloneNode(true);

    adForm.appendChild(node);
    var successBlock = document.querySelector('.success');

    successBlock.addEventListener('click', hideSuccessBlockClickHandler);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        hideSuccessBlockClickHandler();
      }
    });
    window.main.mapDisabled = true;
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

  timeIn.addEventListener('change', function () {
    changeTimeOption(timeIn, timeOut);
  });

  timeOut.addEventListener('change', function () {
    changeTimeOption(timeOut, timeIn);
  });

  houseType.addEventListener('change', function () {
    price.placeholder = PriceForHouseType[houseType.value.toUpperCase()];
    price.min = PriceForHouseType[houseType.value.toUpperCase()];
  });

  room.addEventListener('change', function () {
    window.validateRoomsForGuests();
  });

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), successPostHandler, errorHandler);
    evt.preventDefault();
  });

  adFormReset.addEventListener('click', resetPageState);
})();

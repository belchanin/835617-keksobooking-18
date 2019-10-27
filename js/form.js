'use strict';

(function () {
  var adFormSubmit = window.util.adForm.querySelector('.ad-form__submit');
  var room = window.util.adForm.querySelector('[name = "rooms"]');
  var guest = window.util.adForm.querySelector('[name= "capacity"]');
  var houseType = window.util.adForm.querySelector('[name= "type"]');
  var price = window.util.adForm.querySelector('[name= "price"]');
  var timeIn = window.util.adForm.querySelector('[name= "timein"]');
  var timeOut = window.util.adForm.querySelector('[name= "timeout"]');

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

  adFormSubmit.addEventListener('click', function () {
    validateRoomsForGuests();
  });
})();

'use strict';

(function () {
  var adFormSubmit = window.util.adForm.querySelector('.ad-form__submit');
  var room = window.util.adForm.querySelector('[name = "rooms"]');
  var guest = window.util.adForm.querySelector('[name= "capacity"]');

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

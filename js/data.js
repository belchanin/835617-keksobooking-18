'use strict';

(function () {
  var ROOM_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ROOM_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var generateFeaturesArray = function (array, count) {
    var newArray = [];

    for (var i = 0; i < count; i++) {
      newArray.push(array[i]);
    }

    return newArray;
  };

  window.generateArray = function (count) {
    var array = [];

    for (var i = 0; i < count; i++) {
      var object = {
        'author': {
          'avatar': 'img/avatars/user0' + window.util.getRandomInt(1, 8) + '.png'
        },

        'offer': {
          'title': 'Привет, мир!',
          'address': window.util.getRandomInt(100, 600) + ',' + window.util.getRandomInt(100, 600),
          'price': '2000',
          'type': ROOM_TYPES[window.util.getRandomInt(0, 3)],
          'rooms': window.util.getRandomInt(1, 5),
          'guests': window.util.getRandomInt(1, 5),
          'checkin': window.util.getRandomInt(12, 14) + ':00',
          'checkout': window.util.getRandomInt(12, 14) + ':00',
          'features': generateFeaturesArray(ROOM_FEATURES, window.util.getRandomInt(1, ROOM_FEATURES.length)),
          'description': 'Описание',
          'photos': ['http://o0.github.io/assets/images/tokyo/hotel' + window.util.getRandomInt(1, 3) + '.jpg', 'http://o0.github.io/assets/images/tokyo/hotel' + window.util.getRandomInt(1, 3) + '.jpg'],
        },

        'location': {
          'x': window.util.getRandomInt(0, 1200) + PIN_WIDTH / 2,
          'y': window.util.getRandomInt(130, 630) + PIN_HEIGHT,
        },
      };
      array.push(object);
    }
    return array;
  };
})();

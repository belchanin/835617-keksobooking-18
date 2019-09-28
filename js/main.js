'use strict';

var ROOM_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOM_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PIN_QUANTITY = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var generateFeaturesArray = function (array, count) {
  var newArray = [];

  for (var i = 0; i < count; i++) {
    newArray.push(array[i]);
  }

  return newArray;
};

var generateObjectData = function () {
  return {
    'author': {
      'avatar': 'img/avatars/user0' + getRandomInt(1, 8) + '.png'
    },

    'offer': {
      'title': 'Привет, мир!',
      'address': getRandomInt(100, 600) + ',' + getRandomInt(100, 600),
      'price': '2000',
      'type': ROOM_TYPES[getRandomInt(0, 3)],
      'rooms': getRandomInt(1, 5),
      'guests': getRandomInt(1, 5),
      'checkin': getRandomInt(12, 14) + ':00',
      'checkout': getRandomInt(12, 14) + ':00',
      'features': generateFeaturesArray(ROOM_FEATURES, getRandomInt(1, ROOM_FEATURES.length)),
      'description': 'Описание',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel' + getRandomInt(1, 3) + '.jpg', 'http://o0.github.io/assets/images/tokyo/hotel' + getRandomInt(1, 3) + '.jpg'],
    },

    'location': {
      'x': getRandomInt(0, 1200) + PIN_WIDTH / 2,
      'y': getRandomInt(130, 630) + PIN_HEIGHT,
    },
  };
};

var generateArray = function (count) {
  var array = [];

  for (var i = 0; i < count; i++) {
    array.push(generateObjectData());
  }
  return array;
};

var insertData = function (template, element) {
  var newBlock = template.cloneNode(true);
  var pin = newBlock.querySelector('.map__pin');
  var img = newBlock.querySelector('img');

  pin.style.left = element.location.x + 'px';
  pin.style.top = element.location.y + 'px';
  img.setAttribute('src', element.author.avatar);
  img.setAttribute('alt', element.offer.title);

  return newBlock;
};

document.querySelector('.map').classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin').content;
var pinList = document.querySelector('.map__pins');

var pins = generateArray(PIN_QUANTITY);
var fragment = document.createDocumentFragment();

for (var i = 0; i < PIN_QUANTITY; i++) {
  fragment.appendChild(insertData(pinTemplate, pins[i]));
}

pinList.appendChild(fragment);


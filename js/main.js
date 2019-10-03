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

var generateArray = function (count) {
  var array = [];

  for (var i = 0; i < count; i++) {
    var object = {
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
    array.push(object);
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

var pinTemplate = document.querySelector('#pin').content;
var pinList = document.querySelector('.map__pins');

var pins = generateArray(PIN_QUANTITY);
var fragment = document.createDocumentFragment();

var renderPins = function () {
  for (var i = 0; i < PIN_QUANTITY; i++) {
    fragment.appendChild(insertData(pinTemplate, pins[i]));
  }
  pinList.appendChild(fragment);
};

var adForm = document.querySelector('.ad-form');
var adFormChildren = adForm.children;
var map = document.querySelector('.map');
var mapPinMain = map.querySelector('.map__pin--main');
var mapFilters = map.querySelector('.map__filters');
var mapFiltersChildren = mapFilters.children;
var addressInput = adForm.querySelector('input[name = "address"]');
var adFormSubmit = adForm.querySelector('.ad-form__submit');

var ENTER_KEYCODE = 13;
var MAIN_PIN_TAIL_HEIGHT = 22;
var MAIN_PIN_WIDTH = 62;
var MAIN_PIN_HEIGHT = 62;

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

var changePageState = function () {
  map.classList.remove('map--faded');
  renderPins();
  adForm.classList.remove('ad-form--disabled');
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
  if (evt.keyCode === ENTER_KEYCODE) {
    changePageState();
  }
});

var room = adForm.querySelector('[name = "rooms"]');
var guest = adForm.querySelector('[name= "capacity"]');

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


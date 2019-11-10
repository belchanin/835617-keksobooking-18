'use strict';

(function () {
  var PIN_QUANTITY = 5;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var map = document.querySelector('.map');
  var filtersContainer = map.querySelector('.map__filters-container');

  var escCardCloseClickHandler = function (evt) {
    var newCardContent = document.querySelector('.map__card');

    if (evt.keyCode === window.util.ESC_KEYCODE) {
      deleteCard(newCardContent);
    }

    document.removeEventListener('keydown', escCardCloseClickHandler);
  };

  var showCard = function (element) {
    var mapCard = map.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
    var newCard = window.insertCardData(element);
    map.insertBefore(newCard, filtersContainer);

    var newCardContent = document.querySelector('.map__card');
    var cardClose = map.querySelector('.popup__close');

    document.addEventListener('keydown', escCardCloseClickHandler);

    cardClose.addEventListener('click', function () {
      deleteCard(newCardContent);
    });

    cardClose.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        deleteCard(newCardContent);
      }
    });
  };

  var deleteCard = function (element) {
    element.remove();
  };

  var cardOpenСlickHander = function (listener, element) {
    listener.addEventListener('click', function () {
      showCard(element);
    });

    listener.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        showCard(element);
      }
    });
  };

  var insertData = function (template, element) {
    var newBlock = template.cloneNode(true);
    var pin = newBlock.querySelector('.map__pin:not(.map__pin--main)');
    var img = newBlock.querySelector('img');

    pin.style.left = element.location.x - PIN_WIDTH / 2 + 'px';
    pin.style.top = element.location.y - PIN_HEIGHT + 'px';
    img.src = element.author.avatar;
    img.alt = element.offer.title;

    return newBlock;
  };

  var pinTemplate = document.querySelector('#pin').content;
  var pinList = document.querySelector('.map__pins');

  var renderPins = function (pinsData) {
    var fragment = document.createDocumentFragment();
    var limitCycle = pinsData.length > window.pin.PIN_QUANTITY ? window.pin.PIN_QUANTITY : pinsData.length;
    for (var i = 0; i < limitCycle; i++) {
      fragment.appendChild(insertData(pinTemplate, pinsData[i]));
    }
    pinList.appendChild(fragment);
    var children = pinList.querySelectorAll('.map__pin');
    children.forEach(function (element, index) {
      if (!element.classList.contains('map__pin--main')) {
        cardOpenСlickHander(element, pinsData[index - 1]);
      }
    });
  };

  window.pin = {
    renderPins: renderPins,
    deleteCard: deleteCard,
    PIN_QUANTITY: PIN_QUANTITY,
  };
})();

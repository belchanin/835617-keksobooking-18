'use strict';

(function () {
  var PIN_QUANTITY = 5;
  var map = document.querySelector('.map');
  var filtersContainer = map.querySelector('.map__filters-container');

  var showCard = function (element) {
    var newCard = window.insertCardData(element);
    map.insertBefore(newCard, filtersContainer);

    var cardClose = map.querySelector('.popup__close');
    var mapCard = map.querySelector('.map__card');

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        deleteCard(mapCard);
      }
    });

    cardClose.addEventListener('click', function () {
      deleteCard(mapCard);
    });

    cardClose.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        deleteCard(mapCard);
      }
    });
  };

  var deleteCard = function (element) {
    map.removeChild(element);
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

    pin.style.left = element.location.x + 'px';
    pin.style.top = element.location.y + 'px';
    img.setAttribute('src', element.author.avatar);
    img.setAttribute('alt', element.offer.title);

    return newBlock;
  };

  var pinTemplate = document.querySelector('#pin').content;
  var pinList = document.querySelector('.map__pins');

  window.renderPins = function (pinsData) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < PIN_QUANTITY; i++) {
      fragment.appendChild(insertData(pinTemplate, pinsData[i]));
    }
    pinList.appendChild(fragment);
    var children = pinList.children;
    for (i = 2; i < children.length; i++) {
      cardOpenСlickHander(children[i], pinsData[i - 2]);
    }
  };
})();

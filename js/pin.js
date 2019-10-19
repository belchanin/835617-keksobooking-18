'use strict';

(function () {
  var PIN_QUANTITY = 5;

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

  window.renderPins = function (pinsData) {
    pinList.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < PIN_QUANTITY; i++) {
      fragment.appendChild(insertData(pinTemplate, pinsData[i]));
    }
    pinList.appendChild(fragment);
  };
})();

'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var adForm = document.querySelector('.ad-form');

  window.util = {
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    ENTER_KEYCODE: ENTER_KEYCODE,
    adForm: adForm,
  };
})();

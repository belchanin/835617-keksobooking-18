'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  window.util = {
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
  };
})();

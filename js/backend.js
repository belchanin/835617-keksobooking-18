'use strict';

(function () {
  var STATUS_OK = 200;
  var TIMEOUT = 10000;

  var setXHRParams = function (method, timeout, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = timeout;

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения. Пожалуйста, обновите страницу');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open(method, url);

    switch (method) {
      case 'POST':
        xhr.send(data);
        break;
      case 'GET':
        xhr.send();
        break;
      default:
        throw new Error('Неверный метод');
    }
  };

  window.backend = {
    load: function (onLoad, onError) {
      var URL = 'https://js.dump.academy/keksobooking/data';
      setXHRParams('GET', TIMEOUT, URL, onLoad, onError);
    },
    save: function (data, onLoad, onError) {
      var URL = 'https://js.dump.academy/keksobooking';
      setXHRParams('POST', TIMEOUT, URL, onLoad, onError, data);
    },
  };
})();

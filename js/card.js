'use strict';

(function () {
  var card = document.querySelector('#card').content;

  var HouseType = {
    BUNGALO: 'Бунгало',
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
  };

  var FeaturesType = {
    WIFI: 'Wi-Fi',
    DISHWASHER: 'Посудомоечная машина',
    PARKING: 'Парковка',
    WASHER: 'Стиральная машина',
    ELEVATOR: 'Лифт',
    CONDITIONER: 'Кондиционер',
  };

  var renderCardDescription = function (objectElement, domElement) {
    if (objectElement) {
      domElement.textContent = objectElement;
    } else {
      domElement.style.display = 'none';
    }
  };

  window.insertCardData = function (element) {
    var newBlock = card.cloneNode(true);
    var popupTitle = newBlock.querySelector('.popup__title');
    var popupTextAddress = newBlock.querySelector('.popup__text--address');
    var popupTextPrice = newBlock.querySelector('.popup__text--price');
    var popupType = newBlock.querySelector('.popup__type');
    var popupCapacity = newBlock.querySelector('.popup__text--capacity');
    var popupTime = newBlock.querySelector('.popup__text--time');
    var popupFeatures = newBlock.querySelector('.popup__features');
    var popupDescription = newBlock.querySelector('.popup__description');
    var popupPhotos = newBlock.querySelector('.popup__photos');
    var popupAvatar = newBlock.querySelector('.popup__avatar');
    var popupPhotosImg = popupPhotos.querySelector('img');

    renderCardDescription(element.offer.title, popupTitle);
    renderCardDescription(element.offer.address, popupTextAddress);
    renderCardDescription(element.offer.description, popupDescription);

    if (element.offer.price) {
      popupTextPrice.textContent = element.offer.price + ' ₽/ночь';
    } else {
      popupTextPrice.style.display = 'none';
    }

    if (element.offer.type) {
      popupType.textContent = HouseType[element.offer.type.toUpperCase()];
    } else {
      popupType.style.display = 'none';
    }

    if (element.offer.rooms && element.offer.guests) {
      popupCapacity.textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
    } else {
      popupCapacity.style.display = 'none';
    }

    if (element.offer.checkin !== '0:00' && element.offer.checkout !== '0:00') {
      popupTime.textContent = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
    } else {
      popupTime.style.display = 'none';
    }

    if (element.offer.features) {
      for (var i = 0; i < element.offer.features.length; i++) {
        var newElement = document.createElement('li');
        newElement.textContent = FeaturesType[element.offer.features[i].toUpperCase()];
        popupFeatures.appendChild(newElement);
      }
    } else {
      popupFeatures.style.display = 'none';
    }

    if (element.offer.photos.length) {
      for (i = 0; i < element.offer.photos.length; i++) {
        if (i === 0) {
          popupPhotosImg.setAttribute('src', element.offer.photos[i]);
        } else {
          var newPhoto = popupPhotosImg.cloneNode(true);
          newPhoto.setAttribute('src', element.offer.photos[i]);
          popupPhotos.appendChild(newPhoto);

        }
      }
    } else {
      popupPhotos.style.display = 'none';
    }

    if (element.author.avatar) {
      popupAvatar.setAttribute('src', element.author.avatar);
    } else {
      popupAvatar.style.display = 'none';
    }

    return newBlock;
  };
}());

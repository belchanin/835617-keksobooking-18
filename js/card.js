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

    popupTitle.textContent = element.offer.title;
    popupTextAddress.textContent = element.offer.address;
    popupTextPrice.textContent = element.offer.price + ' ₽/ночь';
    popupType.textContent = HouseType[element.offer.type.toUpperCase()];
    popupCapacity.textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
    popupTime.textContent = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;

    for (var i = 0; i < element.offer.features.length; i++) {
      var newElement = document.createElement('li');
      newElement.textContent = FeaturesType[element.offer.features[i].toUpperCase()];
      popupFeatures.appendChild(newElement);
    }
    popupDescription.textContent = element.offer.description;

    for (i = 0; i < element.offer.photos.length; i++) {
      if (i === 0) {
        popupPhotosImg.setAttribute('src', element.offer.photos[i]);
      } else {
        var newPhoto = popupPhotosImg.cloneNode(true);
        newPhoto.setAttribute('src', element.offer.photos[i]);
        popupPhotos.appendChild(newPhoto);

      }
    }

    popupAvatar.setAttribute('src', element.author.avatar);

    return newBlock;
  };
}());

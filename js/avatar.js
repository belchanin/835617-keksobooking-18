'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var ImageParams = {
    WIDTH: 70,
    HEIGHT: 70,
  };

  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  var houseFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var housePhotoPreview = document.querySelector('.ad-form__photo');

  var avatarChooseChangeHandler = function () {
    chooseFile(avatarFileChooser, avatarPreview, false);
  };

  var housePhotoChooseChangeHandler = function () {
    chooseFile(houseFileChooser, housePhotoPreview, true);
  };

  var chooseFile = function (fileChooser, preview, newElement) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (newElement) {
          var image = document.createElement('img');
          image.src = reader.result;
          image.width = ImageParams.WIDTH;
          image.height = ImageParams.HEIGHT;
          preview.appendChild(image);
        } else {
          preview.src = reader.result;
        }
      });

      reader.readAsDataURL(file);
    }
  };

  avatarFileChooser.addEventListener('change', avatarChooseChangeHandler);
  houseFileChooser.addEventListener('change', housePhotoChooseChangeHandler);
})();

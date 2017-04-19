// form.js
'use strict';

(function () {

  var upload = document.querySelector('.upload');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFormTextarea = document.querySelector('textarea');
  var uploadFormResize = document.querySelector('.upload-resize-controls');
  var uploadFormResizeDec = uploadFormResize.querySelector('.upload-resize-controls-button-dec');
  var uploadFormResizeInc = uploadFormResize.querySelector('.upload-resize-controls-button-inc');
  var uploadFormResizeValue = uploadFormResize.querySelector('.upload-resize-controls-value');
  var uploadImgPreview = uploadOverlay.querySelector('.filter-image-preview');
  var uploadFilterControls = uploadOverlay.querySelector('.upload-filter-controls');

  var uploadFilterLevel = uploadFilterControls.querySelector('.upload-filter-level');
  var uploadFilterLevelPin = uploadFilterControls.querySelector('.upload-filter-level-pin');
  var uploadFilterLevelBar = uploadFilterControls.querySelector('.upload-filter-level-val');

  var filterObject = {

    none: {
      filter: 'none',
      defaultValue: 0,
      type: function (value) {
        return false;
      }
    },

    chrome: {
      filter: 'grayscale',
      defaultValue: 1,
      type: function (value) {
        var valueType = value / 100;
        return valueType;
      }
    },

    sepia: {
      filter: 'sepia',
      defaultValue: 1,
      type: function (value) {
        var valueType = value / 100;
        return valueType;
      }
    },

    marvin: {
      filter: 'invert',
      defaultValue: 100 + '%',
      type: function (value) {
        var valueType = value;
        return valueType + '%';
      }
    },

    phobos: {
      filter: 'blur',
      defaultValue: 3 + 'px',
      type: function (value) {
        var valueType = value * 3 / 100;
        return valueType + 'px';
      }
    },

    heat: {
      filter: 'brightness',
      defaultValue: 3,
      type: function (value) {
        var valueType = value * 3 / 100;
        return valueType;
      }
    }

  };

  var scaleElement = {
    targetElement: uploadImgPreview,
    minusButton: uploadFormResizeDec,
    plusButton: uploadFormResizeInc,
    scaleValueField: uploadFormResizeValue
  }

  var scaleOptions = {
    maxValue: 100,
    step: 25
  }

  // uploadOverlayHide();
  uploadFormShow();
  uploadFormCommentsProperties();
  onSendButtonClick();
  resetPinPosition();
  onControlButtonClick(scaleElement, scaleOptions);


  uploadFilterLevel.classList.add('invisible');

  uploadFilterLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var pinPosition = uploadFilterLevelPin.offsetLeft - shift.x;
      var pinPositionProc = (pinPosition / 455 * 100).toFixed(1);

      if (pinPositionProc >= 0 && pinPositionProc <= 100) {
        uploadFilterLevelPin.style.left = pinPositionProc + '%';
        uploadFilterLevelBar.style.width = uploadFilterLevelPin.style.left;
      }

      var filterNameChecked = uploadOverlay.querySelector('input[name="upload-filter"]:checked').getAttribute('value');
      var filterName = filterNameChecked;
      var filterValue = (uploadFilterLevelPin.style.left).slice(0, -1);
      var adaptedValue = filterObject[filterName].type(filterValue);
      var currentFilter = filterObject[filterName].filter;
      renderFilter(currentFilter, adaptedValue);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

  });

  uploadFilterControls.addEventListener('click', function (evt) {
    var target = evt.target;
    var currentFilterName;
    var currentFilterDefaultValue;

    if (target.tagName === 'INPUT') {
      deleteSecondClass(uploadImgPreview);
      uploadImgPreview.classList.add('filter-' + target.value);

      currentFilterName = target.value;
      currentFilterDefaultValue = filterObject[currentFilterName].defaultValue;
      renderFilter(currentFilterName, currentFilterDefaultValue);
      resetPinPosition();

      if (currentFilterName === 'none') {
        uploadFilterLevel.classList.add('invisible');
      } else {
        uploadFilterLevel.classList.remove('invisible');
      }

      console.log(uploadImgPreview)
    }

  });

  upload.querySelector('.upload-form-description').addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.moduleUtils.esc) {
      evt.stopPropagation();
    }
  });

  upload.querySelector('.upload-form-cancel').addEventListener('click', function () {
    uploadOverlayHide();
  });

  upload.querySelector('#upload-file').addEventListener('change', function () {
    uploadOverlayShow();
    deleteSecondClass(uploadImgPreview);
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.moduleUtils.esc) {
      uploadOverlayHide();
    }
  });

  function onControlButtonClick(element, options) {

    element.scaleValueField.value = options.maxValue + '%';
    var scaleValue = Number(element.scaleValueField.value.slice(0, -1));
    element.targetElement.style.transform = 'scale(' + scaleValue / options.maxValue + ')';

    element.minusButton.addEventListener('click', function (evt) {
      if (evt.target === element.minusButton && scaleValue >= (options.step * 2)) {
        scaleValue = scaleValue - options.step;
      } else {
        scaleValue = options.step;
      }
      element.scaleValueField.value = scaleValue + '%';
      element.targetElement.style.transform = 'scale(' + scaleValue / options.maxValue + ')';
    });

    element.plusButton.addEventListener('click', function (evt) {
      if (evt.target === element.plusButton && scaleValue <= (options.maxValue - options.step)) {
        scaleValue = scaleValue + options.step;
      } else {
        scaleValue = options.maxValue;
      }
      element.scaleValueField.value = scaleValue + '%';
      element.targetElement.style.transform = 'scale(' + scaleValue / options.maxValue + ')';
    });

};

  function resetPinPosition() {
    uploadFilterLevelPin.style.left = 100 + '%';
    uploadFilterLevelBar.style.width = uploadFilterLevelPin.style.left;
  }

  function renderFilter(filterName, filterValue) {
    var scaleValue = Number(uploadFormResizeValue.value.slice(0, -1));
    uploadImgPreview.style = 'filter:' + filterName + '(' + filterValue + ');' + 'transform: scale(' + scaleValue / 100 + ')';
  }

  function onSendButtonClick() {
    document.querySelector('.upload-form-submit').addEventListener('click', function () {
      if (uploadFormTextarea.validity.valid === false) {
        uploadFormTextarea.style = 'outline-color: red';
      } else {
        uploadFormTextarea.style = 'outline-color: none';
      }
    });

    uploadFormTextarea.addEventListener('click', function () {
      uploadFormTextarea.style = 'outline-color: none';
    });
  }

  function deleteSecondClass(nodeElement) {
    if (nodeElement.classList[1]) {
      nodeElement.classList.remove(nodeElement.classList[1]);
    }
  }

  function uploadFormCommentsProperties() {
    uploadFormTextarea.setAttribute('minlength', '30');
    uploadFormTextarea.setAttribute('maxlength', '100');
    uploadFormTextarea.setAttribute('required', 'required');
  }

  function uploadOverlayShow() {
    upload.querySelector('.upload-overlay').classList.remove('invisible');
  }

  function uploadFormShow() {
    upload.querySelector('.upload-form').classList.remove('invisible');
  }

  function uploadOverlayHide() {
    upload.querySelector('.upload-overlay').classList.add('invisible');
  }

})();

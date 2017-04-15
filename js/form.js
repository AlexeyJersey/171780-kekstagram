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

  // uploadOverlayHide();
  uploadFormShow();
  uploadFormCommentsProperties();
  onResizeControlsBtnClick();
  renderUploadFilterNodeList();
  onSendButtonClick();

  /////////////////////////

  var uploadFilterLevel = uploadFilterControls.querySelector('.upload-filter-level');
  var uploadFilterLevelPin = uploadFilterControls.querySelector('.upload-filter-level-pin');
  var uploadFilterLevelBar = uploadFilterControls.querySelector('.upload-filter-level-val');

  uploadFilterLevelPin.style.left = 455 + 'px';
  uploadFilterLevelBar.style.width = 455 + 'px';

  uploadFilterLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var pinPosition = uploadFilterLevelPin.offsetLeft - shift.x;

      if (pinPosition >= 0 && pinPosition <= 455) {
        uploadFilterLevelPin.style.left = pinPosition + 'px';
        uploadFilterLevelBar.style.width = pinPosition + 'px';
      }

      console.log(pinPosition);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  //////////////////////////

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.moduleUtils.esc) {
      uploadOverlayHide();
    }
  });

  uploadFilterControls.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.tagName === 'INPUT') {
      deleteSecondClass(uploadImgPreview);
      uploadImgPreview.classList.add(target.dataset.class);
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

  function renderUploadFilterNodeList() {
    var uploadFilterNodeList = uploadFilterControls.querySelectorAll('input');
    for (var m = 0; m < uploadFilterNodeList.length; m++) {
      uploadFilterNodeList[m].dataset.class = 'filter-' + uploadFilterNodeList[m].value;
    }
  }

  function deleteSecondClass(nodeElement) {
    if (nodeElement.classList[1]) {
      nodeElement.classList.remove(nodeElement.classList[1]);
    }
  }

  function onResizeControlsBtnClick() {
    var value = Number(uploadFormResizeValue.value.slice(0, -1));
    uploadImgPreview.style.transform = 'scale(' + value / 100 + ')';

    uploadFormResizeDec.addEventListener('click', function (evt) {
      if (evt.target === uploadFormResizeDec, value >= 50) {
        value = value - 25;
      } else {
        value = 25;
      }
      uploadFormResizeValue.value = value + '%';
      uploadImgPreview.style.transform = 'scale(' + value / 100 + ')';
    });

    uploadFormResizeInc.addEventListener('click', function (evt) {
      if (evt.target === uploadFormResizeDec, value <= 75) {
        value = value + 25;
      } else {
        value = 100;
      }
      uploadFormResizeValue.value = value + '%';
      uploadImgPreview.style.transform = 'scale(' + value / 100 + ')';
    });
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

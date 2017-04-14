// pictures.js
'use strict';

var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');
var pictureList = document.querySelector('.pictures');

var upload = document.querySelector('.upload');
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadFormTextarea = document.querySelector('textarea');
var uploadFormResize = document.querySelector('.upload-resize-controls');
var uploadFormResizeDec = uploadFormResize.querySelector('.upload-resize-controls-button-dec');
var uploadFormResizeInc = uploadFormResize.querySelector('.upload-resize-controls-button-inc');
var uploadFormResizeValue = uploadFormResize.querySelector('.upload-resize-controls-value');
var uploadImgPreview = uploadOverlay.querySelector('.filter-image-preview');
var uploadFilterControls = uploadOverlay.querySelector('.upload-filter-controls');

var ESC_KEY = 27;
var ENTER_KEY = 13;

uploadOverlayHide();
picturesShow();
uploadFormShow();
onSmallPictureClick();
uploadFormCommentsProperties();
onResizeControlsBtnClick();
renderUploadFilterNodeList();
onSendButtonClick();

uploadFilterControls.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.tagName === 'INPUT') {
    deleteSecondClass(uploadImgPreview);
    uploadImgPreview.classList.add(target.dataset.class);
  }
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEY) {
    galleryOverlayHide();
    uploadOverlayHide();
  }
});

upload.querySelector('.upload-form-description').addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEY) {
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

galleryOverlayClose.addEventListener('click', function () {
  galleryOverlayHide();
});

galleryOverlayClose.addEventListener('keydown', function (evt) {
  if (isActivationEvent(evt)) {
    galleryOverlayHide();
  }
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

function onSmallPictureClick() {
  var pictureNodeList = document.querySelectorAll('.picture');
  for (var l = 0; l < pictureNodeList.length; l++) {
    pictureNodeList[l].addEventListener('click', function (evt) {
      evt.preventDefault();
      var url = this.pictureProperties.url;
      var likes = this.pictureProperties.likes;
      var comments = this.pictureProperties.comments;
      galleryOverlayRender(url, likes, comments);
    });
  }
}

function galleryOverlayRender(url, likes, comments) {
  galleryOverlay.querySelector('.gallery-overlay-image').src = url;
  galleryOverlay.querySelector('.likes-count').textContent = likes;
  galleryOverlay.querySelector('.comments-count').textContent = comments;
  galleryOverlayClose.setAttribute('tabindex', '0');
  galleryOverlayShow();

}

function picturesShow() {
  var pictureTemplate = document.querySelector('#picture-template').content;
  var pictureListFragment = document.createDocumentFragment();

  for (var k = 0; k < pictureObjectCollection.length; k++) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('img').src = pictureObjectCollection[k].url;
    pictureElement.querySelector('.picture-likes').textContent = pictureObjectCollection[k].likes;
    pictureElement.querySelector('.picture-comments').textContent = pictureObjectCollection[k].comments.length;
    pictureElement.querySelector('img').setAttribute('tabindex', 0);
    pictureElement.querySelector('.picture').pictureProperties = {
      url: pictureObjectCollection[k].url,
      likes: pictureObjectCollection[k].likes,
      comments: pictureObjectCollection[k].comments.length
    };

    pictureListFragment.appendChild(pictureElement);
  }

  pictureList.appendChild(pictureListFragment);
}

function galleryOverlayShow() {
  galleryOverlay.classList.remove('invisible');
}

function galleryOverlayHide() {
  galleryOverlay.classList.add('invisible');
}

function uploadOverlayShow() {
  upload.querySelector('.upload-overlay').classList.remove('invisible');
}

function uploadFormShow() {
  upload.querySelector('.upload-form').classList.remove('invisible');
}

function isActivationEvent(evt) {
  return evt.keyCode && evt.keyCode === ENTER_KEY;
}

function uploadOverlayHide() {
  upload.querySelector('.upload-overlay').classList.add('invisible');
}

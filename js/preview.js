// preview.js
'use strict'

window.modulePreview = (function() {

var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

// onSmallPictureClick();

galleryOverlayClose.addEventListener('click', function () {
  galleryOverlayHide();
});

galleryOverlayClose.addEventListener('keydown', function (evt) {
  if (isActivationEvent(evt)) {
    galleryOverlayHide();
  }
});

function onSmallPictureClick() {
  var pictureNodeList = document.querySelectorAll('.picture');
  for (var l = 0; l < pictureNodeList.length; l++) {
    pictureNodeList[l].addEventListener('click', function (evt) {
      evt.preventDefault();
      var url = this.pictureProperties.url;
      var likes = this.pictureProperties.likes;
      var comments = this.pictureProperties.comments;
      galleryOverlayRender(url, likes, comments);
      // console.log(url)
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

function galleryOverlayShow() {
  galleryOverlay.classList.remove('invisible');
}

function galleryOverlayHide() {
  galleryOverlay.classList.add('invisible');
}

return {
  onSmallPictureClick: onSmallPictureClick,
  galleryOverlayRender: galleryOverlayRender,
  galleryOverlayShow: galleryOverlayShow,
  galleryOverlayHide: galleryOverlayHide
}

})();

console.log('PREVIEW');
console.log(window.modulePreview.onSmallPictureClick);

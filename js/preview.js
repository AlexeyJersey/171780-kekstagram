// preview.js
'use strict';

window.modulePreview = (function () {

  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.moduleUtils.esc) {
      galleryOverlayHide();
    }
  });

  galleryOverlayClose.addEventListener('click', function () {
    galleryOverlayHide();
  });

  galleryOverlayClose.addEventListener('keydown', function (evt) {
    if (window.moduleUtils.isActivationEvent(evt)) {
      galleryOverlayHide();
    }
  });

  function onSmallPictureClick() {
    var pictureNodeList = document.querySelectorAll('.picture');
    for (var l = 0; l < pictureNodeList.length; l++) {
      pictureNodeList[l].addEventListener('click', function (evt) {
        evt.preventDefault();
        var target = evt.target;
        var url = target.parentNode.pictureProperties.url;
        var likes = target.parentNode.pictureProperties.likes;
        var comments = target.parentNode.pictureProperties.comments;
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
  };

})();

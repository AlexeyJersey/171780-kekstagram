// preview.js
'use strict'

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

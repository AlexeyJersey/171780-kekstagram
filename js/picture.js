// picture.js
'use strict';

window.modulePicture = (function () {

  var pictureList = document.querySelector('.pictures');

  function smallPicturesRender() {
    var pictureTemplate = document.querySelector('#picture-template').content;
    var pictureListFragment = document.createDocumentFragment();

    for (var k = 0; k < window.moduleData.length; k++) {
      var pictureElement = pictureTemplate.cloneNode(true);

      pictureElement.querySelector('img').src = window.moduleData[k].url;
      pictureElement.querySelector('.picture-likes').textContent = window.moduleData[k].likes;
      pictureElement.querySelector('.picture-comments').textContent = window.moduleData[k].comments.length;
      pictureElement.querySelector('img').setAttribute('tabindex', 0);
      pictureElement.querySelector('.picture').pictureProperties = {
        url: window.moduleData[k].url,
        likes: window.moduleData[k].likes,
        comments: window.moduleData[k].comments.length
      };

      pictureListFragment.appendChild(pictureElement);
    }

    pictureList.appendChild(pictureListFragment);
  }

  return {
    smallPicturesRender: smallPicturesRender
  };

})();

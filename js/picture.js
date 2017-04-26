// picture.js
'use strict';

window.modulePicture = (function () {

  function smallPicturesRender(collectionData) {
    var pictureList = document.querySelector('.pictures');
    var pictureTemplate = document.querySelector('#picture-template').content;
    var pictureListFragment = document.createDocumentFragment();
    pictureList.innerHTML = '';

    for (var k = 0; k < collectionData.length; k++) {
      var pictureElement = pictureTemplate.cloneNode(true);

      pictureElement.querySelector('img').src = collectionData[k].url;
      pictureElement.querySelector('.picture-likes').textContent = collectionData[k].likes;
      pictureElement.querySelector('.picture-comments').textContent = collectionData[k].comments.length;
      pictureElement.querySelector('img').setAttribute('tabindex', 0);
      pictureElement.querySelector('.picture').pictureProperties = {
        url: collectionData[k].url,
        likes: collectionData[k].likes,
        comments: collectionData[k].comments.length
      };

      pictureListFragment.appendChild(pictureElement);
    }

    pictureList.appendChild(pictureListFragment);
  }

  return {
    smallPicturesRender: smallPicturesRender
  };

})();

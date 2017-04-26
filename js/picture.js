// picture.js
'use strict';

window.modulePicture = (function () {

  function smallPicturesRender(data) {
    var pictureList = document.querySelector('.pictures');
    var pictureTemplate = document.querySelector('#picture-template').content;
    var pictureListFragment = document.createDocumentFragment();
    pictureList.innerHTML = '';

    for (var k = 0; k < data.length; k++) {
      var pictureElement = pictureTemplate.cloneNode(true);

      pictureElement.querySelector('img').src = data[k].url;
      pictureElement.querySelector('.picture-likes').textContent = data[k].likes;
      pictureElement.querySelector('.picture-comments').textContent = data[k].comments.length;
      pictureElement.querySelector('img').setAttribute('tabindex', 0);
      pictureElement.querySelector('.picture').pictureProperties = {
        url: data[k].url,
        likes: data[k].likes,
        comments: data[k].comments.length
      };

      pictureListFragment.appendChild(pictureElement);
    }

    pictureList.appendChild(pictureListFragment);
  }

  return {
    smallPicturesRender: smallPicturesRender
  };

})();

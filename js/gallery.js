// gallery.js
'use strict';

(function () {

  var url = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data';
  var pictureCollection = [];
  var fitersForm = document.querySelector('.filters');

  window.load(url, onLoad, onError);

  fitersForm.addEventListener('click', function(evt) {
    var target = evt.target;
    switch(target.id) {
      case 'filter-popular':
      renderPictures(pictureCollection);
      break;
      case 'filter-new':
      showNewPictures(pictureCollection);
      break;
      case 'filter-discussed':
      showDiscussedPictures(pictureCollection);
      break;
    }
  });

  function onLoad(data) {
    pictureCollection = data;
    filtersFormShow();
    renderPictures(pictureCollection.slice().sort(randomValueCompare));
  }

  function renderPictures(collection) {
    window.modulePicture.smallPicturesRender(collection);
    window.modulePreview.onSmallPictureClick();
  }

  function showNewPictures(collection) {
    renderPictures(randomElements(collection));
  }

  function showDiscussedPictures(collection) {
    var collectionCopy = collection.slice();
    renderPictures(collectionCopy.sort(commentsCompare))
  }

  function commentsCompare(left, right) {
    if (left.comments.length < right.comments.length) {
      return 1;
    } else if (left.comments.length > right.comments.length) {
      return -1;
    }
  }

  function filtersFormShow() {
    fitersForm.classList.remove('hidden');
  }

  function randomValueCompare(a, b) {
    return Math.random() - 0.5;
  }

  function randomElements(collection) {
    var getRandomElements = collection.slice().sort(randomValueCompare).slice(0, 10);
    return getRandomElements;
  }

  function onError(errorMessage) {
    var node = document.createElement('div');
    node.style = 'display: inline-block; z-index: 500; position: fixed; padding-top: 50px; width: 700px; height: 100px; top: 30%; left:50%; transform: translateX(-50%); background-color: white; color: black; font-size: 30px; text-align: center; vertical-align: middle; border-radius: 10px; box-shadow: -15px 15px 35px 5px rgba(0, 0, 0 , 1);';
    node.textContent = 'OOPS! ' + errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

})();

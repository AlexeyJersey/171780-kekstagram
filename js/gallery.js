// gallery.js
'use strict';

(function () {

  var url = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data';

  var fitersForm = document.querySelector('.filters');
  var pictureCollection = [];

  window.load(url, onLoad, onError);

  function onLoad(data) {
    pictureCollection = data;
    filtersFormShow();
    renderPictures(pictureCollection);
  }

  function sortRandom(a, b) {
    return Math.random() - 0.5;
  }

  function randomElements(collection) {
    var getRandomElements = collection.slice().sort(sortRandom).slice(0, 10);
    return getRandomElements;
  }

  function renderPictures(data) {
    window.modulePicture.smallPicturesRender(data);
    window.modulePreview.onSmallPictureClick();
  }

  function showNewPictures() {
    renderPictures(randomElements(pictureCollection));
  }

  fitersForm.addEventListener('click', function(evt) {
    var target = evt.target;
    switch(target.id) {
      case 'filter-popular':
      renderPictures(pictureCollection);
      break;
      case 'filter-new':
      showNewPictures();
      break;
      case 'filter-discussed':
      console.log('*click*')
      break;
    }
  });

  function filtersFormShow() {
    fitersForm.classList.remove('hidden');
  }

  function onError(errorMessage) {
    var node = document.createElement('div');
    node.style = 'display: inline-block; z-index: 500; position: fixed; padding-top: 50px; width: 700px; height: 100px; top: 30%; left:50%; transform: translateX(-50%); background-color: white; color: black; font-size: 30px; text-align: center; vertical-align: middle; border-radius: 10px; box-shadow: -15px 15px 35px 5px rgba(0, 0, 0 , 1);';
    node.textContent = 'OOPS! ' + errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

})();

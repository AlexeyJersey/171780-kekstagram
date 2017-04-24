// gallery.js
'use strict';

(function () {

  var url = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data';

  window.load(url, onLoad, onError);

  function onLoad(data) {
    window.modulePicture.smallPicturesRender(data);
    window.modulePreview.onSmallPictureClick();
  }

  function onError(errorMessage) {
    var node = document.createElement('div');
    node.style = 'display: inline-block; z-index: 500; position: fixed; padding-top: 50px; width: 700px; height: 100px; top: 30%; left:50%; transform: translateX(-50%); background-color: white; color: black; font-size: 30px; text-align: center; vertical-align: middle; border-radius: 10px; box-shadow: -15px 15px 35px 5px rgba(0, 0, 0 , 1);';
    node.textContent = 'OOPS! ' + errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

})();

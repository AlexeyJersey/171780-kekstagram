// upload.js

'use strict';

(function () {

  var uploadInput = document.querySelector('#upload-file');
  var uploadFilterControls = document.querySelector('.upload-filter-controls');
  var uploadFilterLevel = document.querySelector('.upload-filter-level');
  var uploadForm = document.querySelector('.upload-form-preview');
  var previewFilterImg = document.querySelector('.filter-image-preview');
  var previewFilterImgAll = document.querySelectorAll('.filter-image-preview');

  uploadInput.setAttribute('onchange', 'window.handleFiles(this.files)');
  uploadFilterControls.style = 'position: relative;'
  uploadFilterLevel.style = 'top: -60px;';
  uploadForm.style = 'max-width: 586px; max-height: 586px; overflow: hidden;';

  window.handleFiles = function(files) {

    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var imageType = /^image\//;

      if (!imageType.test(file.type)) {
        continue;
      }

      // var img = document.createElement("img");
      var img = document.querySelector('.filter-image-preview');
      // img.classList.add("obj");
      // img.classList.add("filter-image-preview");
      img.file = file;
      // uploadForm.appendChild(img); // Assuming that "uploadForm" is the div output where the content will be displayed.

      var reader = new FileReader();
      reader.onload = (function(aImg) {
        return function(e) {
          aImg.src = e.target.result;
        };
      })(img);
      reader.readAsDataURL(file);
    }

  };

})();

// initialize-filters.js
'use strict';

(function () {

  window.onFilterControlClick = function (targetNode, cb) {
    var imgPreview = document.querySelector('.filter-image-preview');
    var filterControls = document.querySelector('.upload-filter-controls');

    filterControls.addEventListener('click', function (evt) {
      var target = evt.target;
      var oldFilter = imgPreview.classList[1];

      if (target.tagName === 'INPUT') {
        var newFilter = 'filter-' + target.value;
      }

      cb(newFilter, oldFilter);
    });

  };

})();

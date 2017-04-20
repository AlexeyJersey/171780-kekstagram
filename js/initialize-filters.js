// initialize-filters.js
'use strict';

window.initializeFilters = function (targetNode, cb) {
  var imgPreview = document.querySelector('.filter-image-preview');
  var filterControls = document.querySelector('.upload-filter-controls');

  filterControls.addEventListener('click', function (evt) {
    var target = evt.target;

    if (target.tagName === 'INPUT') {
      var newFilter = 'filter-' + target.value;
    }

    if (imgPreview.classList[1]) {
      var oldFilter = imgPreview.classList[1];
    }

    cb(newFilter, oldFilter);
  });

};

// initialize-filters.js
'use strict';

(function () {

  window.onFilterControlAction = function (targetNode, cb) {
    var imgPreview = document.querySelector('.filter-image-preview');
    var filterControls = document.querySelector('.upload-filter-controls');
    var oldFilter = imgPreview.classList[1];
    var newFilter;

    filterControls.addEventListener('click', function (evt) {
      var target = evt.target;

      if (target.tagName === 'INPUT') {
        newFilter = 'filter-' + target.value;
        cb(newFilter, oldFilter);
      }

    });

    filterControls.addEventListener('keydown', function (evt) {
      var target = evt.target;

      if (evt.keyCode === window.moduleUtils.enter && target.tagName === 'LABEL') {
        newFilter = 'filter-' + filterControls.querySelector('#' + target.getAttribute('for')).value;
        cb(newFilter, oldFilter);
      }

    });

  };

})();

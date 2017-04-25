// filters.js
'use strict';


window.moduleFilters = (function () {

  var fitersForm = document.querySelector('.filters');

  function filtersFormShow() {
    fitersForm.classList.remove('hidden');
  }

  return {
    filtersFormShow: filtersFormShow
  }

})();

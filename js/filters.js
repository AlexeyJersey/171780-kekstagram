// filters.js
'use strict';


window.moduleFilters = (function () {

  var fitersForm = document.querySelector('.filters');

  function filtersFormShow() {
    fitersForm.classList.remove('hidden');
  }

  fitersForm.addEventListener('click', function(evt) {
    var target = evt.target;
    switch(target.id) {
      case 'filter-popular':
      console.log('*click!!*')
      break;
      case 'filter-new':
      console.log('*click!!*')
      break;
      case 'filter-discussed':
      console.log('*click!!*')
      break;
    }
  });

  return {
    filtersFormShow: filtersFormShow
  }

})();

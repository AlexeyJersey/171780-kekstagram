// utils.js
'use strict';

window.moduleUtils = (function () {

function numGen(min, max) {
  var numberRandom = Math.random() * (max - min);
  numberRandom = numberRandom.toFixed();
  return +numberRandom;
}

return {
  numGen: numGen
}

})();

console.log(window.moduleUtils);

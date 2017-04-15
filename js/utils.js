// utils.js
'use strict';

window.moduleUtils = (function () {

  var ESC_KEY = 27;
  var ENTER_KEY = 13;

  function numGen(min, max) {
    var numberRandom = Math.random() * (max - min);
    numberRandom = numberRandom.toFixed();
    return +numberRandom;
  }

  function isActivationEvent(evt) {
    return evt.keyCode && evt.keyCode === window.moduleUtils.enter;
  }

  return {
    numGen: numGen,
    esc: ESC_KEY,
    enter: ENTER_KEY,
    isActivationEvent: isActivationEvent
  };

})();

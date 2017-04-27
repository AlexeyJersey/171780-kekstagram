// utils.js
'use strict';

window.moduleUtils = (function () {

  var ESC_KEY = 27;
  var ENTER_KEY = 13;

  function isActivationEvent(evt) {
    return evt.keyCode && evt.keyCode === window.moduleUtils.enter;
  }

  return {
    esc: ESC_KEY,
    enter: ENTER_KEY,
    isActivationEvent: isActivationEvent
  };

})();

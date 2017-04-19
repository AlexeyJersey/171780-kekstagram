// initialize-scale.js
'use strict';

window.initializeScale = (function () {

  function resizeElement(element, options) {
    element.scaleValueField.value = options.maxValue + '%';
    var scaleValue = Number(element.scaleValueField.value.slice(0, -1));
    element.targetElement.style.transform = 'scale(' + scaleValue / options.maxValue + ')';

    element.minusButton.addEventListener('click', function (evt) {
      if (evt.target === element.minusButton && scaleValue >= (options.step * 2)) {
        scaleValue = scaleValue - options.step;
      } else {
        scaleValue = options.step;
      }
      element.scaleValueField.value = scaleValue + '%';
      element.targetElement.style.transform = 'scale(' + scaleValue / options.maxValue + ')';
    });

    element.plusButton.addEventListener('click', function (evt) {
      if (evt.target === element.plusButton && scaleValue <= (options.maxValue - options.step)) {
        scaleValue = scaleValue + options.step;
      } else {
        scaleValue = options.maxValue;
      }
      element.scaleValueField.value = scaleValue + '%';
      element.targetElement.style.transform = 'scale(' + scaleValue / options.maxValue + ')';
    });
  }

  return {
    resizeElement: resizeElement
  }

})();

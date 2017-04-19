// initialize-scale.js
'use strict';

window.initializeScale = (function () {

  function resizeElement(targetElement, minusButton, plusButton, scaleValueField, maxValue, step) {
    scaleValueField.value = maxValue + '%';
    var scaleValue = Number(scaleValueField.value.slice(0, -1));
    targetElement.style.transform = 'scale(' + scaleValue / maxValue + ')';

    minusButton.addEventListener('click', function (evt) {
      if (evt.target === minusButton && scaleValue >= (step * 2)) {
        scaleValue = scaleValue - step;
      } else {
        scaleValue = step;
      }
      scaleValueField.value = scaleValue + '%';
      targetElement.style.transform = 'scale(' + scaleValue / maxValue + ')';
    });

    plusButton.addEventListener('click', function (evt) {
      if (evt.target === plusButton && scaleValue <= (maxValue - step)) {
        scaleValue = scaleValue + step;
      } else {
        scaleValue = maxValue;
      }
      scaleValueField.value = scaleValue + '%';
      targetElement.style.transform = 'scale(' + scaleValue / maxValue + ')';
    });
  }

  return {
    resizeElement: resizeElement
  }

})();

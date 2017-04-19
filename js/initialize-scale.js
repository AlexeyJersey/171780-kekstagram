// initialize-scale.js
'use strict';

window.initializeScale = function (targetNode, callback) {
  var buttonMinus = document.querySelector('.upload-resize-controls-button-dec');
  var buttonPlus = document.querySelector('.upload-resize-controls-button-inc');
  var elementValue = document.querySelector('.upload-resize-controls-value');

  var basicValue = 100 + '%';
  elementValue.value = basicValue;
  var scaleValue = Number(basicValue.slice(0, -1));

  buttonMinus.addEventListener('click', function (evt) {
    if (evt.target === buttonMinus && scaleValue >= 50) {
      scaleValue = scaleValue - 25;
    } else {
      scaleValue = 25;
    }
    callback(targetNode, scaleValue)
  });

  buttonPlus.addEventListener('click', function (evt) {
    if (evt.target === buttonPlus && scaleValue <= 75) {
      scaleValue = scaleValue + 25;
    } else {
      scaleValue = 100;
    }
    callback(targetNode, scaleValue)
  });

  callback(targetNode, scaleValue)
};

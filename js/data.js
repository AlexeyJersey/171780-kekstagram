// data.js
'use strict';

window.moduleData = (function () {

  var photoIds = fillPhotoIds();
  var commentsCollection = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var pictureObjectsCollection = generatePictureCollection();

  function generatePictureCollection() {
    var picturesCollection = [];
    for (var j = 0; j < 25; j++) {
      picturesCollection.push(generatePicture());
    }
    return picturesCollection;
  }

  function generatePicture() {
    return {
      url: generatePhotoUrl(),
      likes: window.moduleUtils.generateNumber(15, 200),
      comments: generateComment()
    };
  }

  function generateComment() {
    var singleSentence = commentsCollection[window.moduleUtils.generateNumber(0, commentsCollection.length - 1)];
    var doubleSentence = commentsCollection[window.moduleUtils.generateNumber(0, commentsCollection.length - 1)] + ' ' + commentsCollection[window.moduleUtils.generateNumber(0, commentsCollection.length - 1)];
    if (window.moduleUtils.generateNumber(0, 1) === 0) {
      return {
        text: singleSentence,
        length: 1
      };
    } else {
      return {
        text: doubleSentence,
        length: 2
      };
    }
  }

  function generatePhotoUrl() {
    return 'photos/' + photoIds.pop() + '.jpg';
  }

  function fillPhotoIds() {
    var idsCollection = [];
    for (var i = 1; i < 26; i++) {
      idsCollection.push(i);
    }
    return idsCollection.sort(function (a, b) {
      return Math.random() > 0.5 ? 1 : -1;
    });
  }

  return pictureObjectsCollection;

})();

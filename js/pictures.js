// pictures-re.js
'use strict';

var photoIds = fillPhotoIds();
var commentsCollection = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'];
var pictureObjectCollection = generatePictureCollection();

function picturesShow() {
  var pictureTemplate = document.querySelector('#picture-template').content;
  var pictureList = document.querySelector('.pictures');
  var pictureListFragment = document.createDocumentFragment();

  for (var k = 0; k < generatePictureCollection().length; k++) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('img').src = pictureObjectCollection[k].url;
    pictureElement.querySelector('.picture-likes').textContent = pictureObjectCollection[k].likes;
    pictureElement.querySelector('.picture-comments').textContent = pictureObjectCollection[k].comments.length;

    pictureListFragment.appendChild(pictureElement);
  }

  pictureList.appendChild(pictureListFragment);
}

function galleryOverlayShow() {
  var galleryOverlayElement = document.querySelector('.gallery-overlay');
  galleryOverlayElement.classList.remove('invisible');
  uploadOverlayHide();

  galleryOverlayElement.querySelector('.gallery-overlay-image').src = pictureObjectCollection[0].url;
  galleryOverlayElement.querySelector('.likes-count').textContent = pictureObjectCollection[0].likes;
  galleryOverlayElement.querySelector('.comments-count').textContent = pictureObjectCollection[0].comments.length;
}

function uploadOverlayHide() {
  document.querySelector('.upload-overlay').classList.add('invisible');
}

function galleryOverlayHide() {
  document.querySelector('.gallery-overlay').classList.add('invisible');
}

picturesShow();
galleryOverlayShow();

function generatePictureCollection() {
  var pictureCollection = [];
  for (var j = 0; j < 25; j++) {;
    pictureCollection.push(pictureGenerator());
  }
  return pictureCollection;
}

function pictureGenerator() {
  return {
    url: generatePhotoUrl(),
    likes: numGen(15, 200),
    comments: generateComment()
  };
}

function generateComment() {
  var singleComment;
  var doubleComment;
  var singleSentence = commentsCollection[numGen(0, commentsCollection.length - 1)];
  var doubleSentence = commentsCollection[numGen(0, commentsCollection.length - 1)] + ' ' + commentsCollection[numGen(0, commentsCollection.length - 1)];
  if (numGen(0, 1) === 0) {
    return singleComment = {
      text: singleSentence,
      length: 1
    };
  } else {
    return doubleComment = {
      text: doubleSentence,
      length: 2
    };
  }
}

function generatePhotoUrl() {
  return 'photos/' + photoIds.pop() + '.jpg';
}

function fillPhotoIds() {
  var idCollection = [];
  for (var i = 1; i < 26; i++) {;
    idCollection.push(i);
  }
  return idCollection.sort(function (a, b) {
    return Math.random() > 0.5 ? 1 : -1;
  });
}

function numGen(min, max) {
  var numberRandom = Math.random() * (max - min);
  numberRandom = numberRandom.toFixed();
  return +numberRandom;
}


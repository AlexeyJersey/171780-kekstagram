// pictures-re.js
'use strict';

var photoIds = fillPhotoIds();
var commentsCollection = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'];
var pictureObjectCollection = generatePictureCollection();

var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');
var pictureList = document.querySelector('.pictures');
var upload = document.querySelector('.upload');

uploadOverlayHide();
picturesShow();
uploadFormShow();

upload.querySelector('.upload-form-description').addEventListener('keydown', function(evt) {
  if (evt.keyCode === 27) {
    evt.stopPropagation();
  }
})

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    uploadOverlayHide();
  }
})

upload.querySelector('.upload-form-cancel').addEventListener('click', function() {
  uploadOverlayHide();
})

upload.querySelector('#upload-file').addEventListener('change', function () {
  upload.querySelector('.upload-overlay').classList.remove('invisible');
})

pictureList.querySelector('.picture').addEventListener('click', function (evt) {
  galleryOverlay.classList.remove('invisible');
})

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    galleryOverlay.classList.add('invisible');
  }
})

galleryOverlayClose.addEventListener('click', function() {
  galleryOverlay.classList.add('invisible');
})

galleryOverlayClose.addEventListener('keydown', function(evt) {
  if (isActivationEvent(evt)) {
    galleryOverlay.classList.add('invisible');
  }
})

pictureList.addEventListener('click', function(evt) {
  evt.preventDefault();
  var target = evt.target;
  while (target != pictureList) {
    if (target.tagName === 'A') {
      var url = target.querySelector('img').getAttribute('src');
      var likes = target.querySelector('.picture-likes').textContent;
      var comments = target.querySelector('.picture-comments').textContent;
      galleryOverlayPictureRender(url, likes, comments);
      galleryOverlay.classList.remove('invisible');
    }
    target = target.parentNode;
  }
});

function uploadFormShow() {
  upload.querySelector('.upload-form').classList.remove('invisible');
}

function isActivationEvent(evt) {
  return evt.keyCode && evt.keyCode === 13;
}

//////////////////////////////////////////////////////

function galleryOverlayPictureRender(url, likes, comments) {
  galleryOverlay.querySelector('.gallery-overlay-image').src = url;
  galleryOverlay.querySelector('.likes-count').textContent = likes;
  galleryOverlay.querySelector('.comments-count').textContent = comments;
  galleryOverlayClose.setAttribute('tabindex', 0);
}

function picturesShow() {
  var pictureTemplate = document.querySelector('#picture-template').content;
  var pictureListFragment = document.createDocumentFragment();

  for (var k = 0; k < generatePictureCollection().length; k++) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('img').src = pictureObjectCollection[k].url;
    pictureElement.querySelector('.picture-likes').textContent = pictureObjectCollection[k].likes;
    pictureElement.querySelector('.picture-comments').textContent = pictureObjectCollection[k].comments.length;
    pictureElement.querySelector('img').setAttribute('tabindex', 0);

    pictureListFragment.appendChild(pictureElement);
  }

  pictureList.appendChild(pictureListFragment);
}

function uploadOverlayHide() {
  upload.querySelector('.upload-overlay').classList.add('invisible');
}

function generatePictureCollection() {
  var pictureCollection = [];
  for (var j = 0; j < 25; j++) {
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
  var singleSentence = commentsCollection[numGen(0, commentsCollection.length - 1)];
  var doubleSentence = commentsCollection[numGen(0, commentsCollection.length - 1)] + ' ' + commentsCollection[numGen(0, commentsCollection.length - 1)];
  if (numGen(0, 1) === 0) {
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
  var idCollection = [];
  for (var i = 1; i < 26; i++) {
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


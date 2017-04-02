// picture.js
'use strict';

// picture data
var pictureDataArr = [];

function pictureGenerator() {
  return {
    url: pictureNorepeatUrl(),
    likes: likesNumGen,
    comments: commentsQty()
  };
}

// url
var urlArr = []; // 'photos/' + i + '.jpg';

function pictureNorepeatUrl() {
  urlArr = shuffle(urlArr);
  if (urlArr.length) {
    return urlArr.pop();
  } else {
    return null;
  }
}

// comments
var commentsTextArray = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'];
var randomComment = commentsTextArray[numGenerator(0, commentsTextArray.length - 1)];
var commentSingle = randomComment;
var commentDouble = randomComment + ' ' + randomComment;

function commentsQty() {
  if (numGenerator(0, 1) === 0) {
    commentSingle = 1;
    return commentSingle;
  } else {
    commentDouble = 2;
    return commentDouble;
  }
}

//likes
var likesNumGen = numGenerator(15, 200);

//arr fill
for (var k = 1; k < 26; k++) {
  urlArr.push('photos/' + k + '.jpg');
  pictureDataArr.push(pictureGenerator());
}

// DOM bg pictures
var pictureTemplate = document.querySelector('#picture-template').content;
var pictureList = document.querySelector('.pictures');
var pictureListFragment = document.createDocumentFragment();

for (var l = 0; l < pictureDataArr.length; l++) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('img').src = pictureDataArr[l].url;
  pictureElement.querySelector('.picture-likes').textContent = pictureDataArr[l].likes;
  pictureElement.querySelector('.picture-comments').textContent = pictureDataArr[l].comments;

  pictureListFragment.appendChild(pictureElement);
}

pictureList.appendChild(pictureListFragment);

// DOM remove upload element
document.querySelector('.upload-overlay').classList.add('invisible');

// DOM gallery img
var galleryOverlayElement = document.querySelector('.gallery-overlay');
galleryOverlayElement.classList.remove('invisible');

galleryOverlayElement.querySelector('.gallery-overlay-image').src = pictureDataArr[numGenerator(0, pictureDataArr.length)].url;
galleryOverlayElement.querySelector('.likes-count').textContent = pictureDataArr[numGenerator(0, pictureDataArr.length)].likes;
galleryOverlayElement.querySelector('.comments-count').textContent = pictureDataArr[numGenerator(0, pictureDataArr.length)].comments;

function numGenerator(minNumber, maxNumber) {
  var numberRandom = Math.random() * (maxNumber - minNumber);
  numberRandom = numberRandom.toFixed();
  return numberRandom;
}

function shuffle(array) {
  for (var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x); {
    return array;
  }
}

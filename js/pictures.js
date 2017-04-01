// picture.js
'use strict';

var adressesArray = []; // 'photos/' + i + '.jpg';
var commentsTextArray = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'];
var pictureDescriptionArray = [];

for (var k = 0; k < 25; k++) {
  adressesArray.push('photos/' + (k + 1) + '.jpg');
  pictureDescriptionArray.push(pictureGenerator());
}

var randomComment = commentsTextArray[numGenerator(0, commentsTextArray.length - 1)];
var commentSingle = randomComment;
var commentDouble = randomComment + ' ' + randomComment;
// var commentsArray = [commentSingle, commentDouble];

var pictureTemplate = document.querySelector('#picture-template').content;
var pictureList = document.querySelector('.pictures');
var pictureListFragment = document.createDocumentFragment();

for (var l = 0; l < pictureDescriptionArray.length; l++) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('img').src = pictureDescriptionArray[l].url;
  pictureElement.querySelector('.picture-likes').textContent = pictureDescriptionArray[l].likes;
  pictureElement.querySelector('.picture-comments').textContent = pictureDescriptionArray[l].comments;

  pictureListFragment.appendChild(pictureElement);
}

pictureList.appendChild(pictureListFragment);

document.querySelector('.upload-overlay').classList.add('invisible');

var galleryOverlayElement = document.querySelector('.gallery-overlay');
galleryOverlayElement.classList.remove('invisible');

galleryOverlayElement.querySelector('.gallery-overlay-image').src = pictureDescriptionArray[numGenerator(0, pictureDescriptionArray.length)].url;
galleryOverlayElement.querySelector('.likes-count').textContent = pictureDescriptionArray[numGenerator(0, pictureDescriptionArray.length)].likes;
galleryOverlayElement.querySelector('.comments-count').textContent = pictureDescriptionArray[numGenerator(0, pictureDescriptionArray.length)].comments;

function numGenerator(minNumber, maxNumber) {
  var numberRandom = Math.random() * (maxNumber - minNumber);
  numberRandom = numberRandom.toFixed();
  return numberRandom;
}

// function takeAnyValueFromArray(array) {
//   return array[numGenerator(0, array.length - 1)];
// }

function shuffle(array) {
  for (var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x); {
    return array;
  }
}

function pictureGenerator() {
  return {
    url: pictureNorepeatAdress(),
    likes: numGenerator(15, 200),
    comments: commentsQty()
  };
}

function pictureNorepeatAdress() {
  adressesArray = shuffle(adressesArray);
  if (adressesArray.length) {
    return adressesArray.pop();
  } else {
    return null;
  }
}

function commentsQty() {
  if (numGenerator(0, 1) === 0) {
    commentSingle = 1;
    return commentSingle;
  } else {
    commentDouble = 2;
    return commentDouble;
  }
}

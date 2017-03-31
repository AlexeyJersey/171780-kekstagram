// picture.js
'use strict';

var pictureAdresses = []; // 'photos/' + i + '.jpg';
var pictureComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'];
var pictureArray = [];

for (var k = 0; k < 25; k++) {
  pictureArray.push(pictureGenerator());
  pictureAdresses.push('photos/' + (k + 1) + '.jpg');
}

function numGenerator(minNumber, maxNumber) {
  var numberRandom = Math.random() * (maxNumber - minNumber);
  numberRandom = numberRandom.toFixed();
  return numberRandom;
}

function takeAnyValueFromArray(array) {
  return array[numGenerator(0, array.length - 1)];
}

function shuffle(array) {
  for(var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    return array;
};

function pictureGenerator() {
  return {
    url: function() {
      pictureAdresses = shuffle(pictureAdresses);
      if (pictureAdresses.length) {
        return pictureAdresses.pop();
      } else {
        return null;
      }
    },
    likes: numGenerator(15, 200),
    comments: takeAnyValueFromArray(pictureComments)
  };
}

var pictureTemplate = document.querySelector('#picture-template').content;
var pictureList = document.querySelector('.pictures');
var pictureListFragment = document.createDocumentFragment();

for (var l = 0; l < pictureArray.length; l++) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('img').src = pictureGenerator().url();
  pictureElement.querySelector('.picture-likes').textContent = pictureGenerator().likes;
  pictureElement.querySelector('.picture-comments').textContent = pictureGenerator().comments;

  pictureListFragment.appendChild(pictureElement);
};

pictureList.appendChild(pictureListFragment);

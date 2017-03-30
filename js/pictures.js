// picture.js
'use strict';

var pictureAdresses = 'pictures/{{' + numGenerator(1, 25) + '}}.jpg';
var pictureComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'];
var pictureLikes = numGenerator(15, 200);
var pictureArray = [];

function numGenerator(minNumber, maxNumber) {
  var numberRandom = Math.random() * (maxNumber - minNumber);
  numberRandom = numberRandom.toFixed();
  return numberRandom;
}

function takeAnyValueFromArray(array) {
  return array[numGenerator(0, array.length - 1)];
}

function pictureGenerator() {
  return {
    url: pictureAdresses,
    likes: pictureLikes,
    comments: takeAnyValueFromArray(pictureComments)
  };
}

for (var i = 0; i < 25; i++) {
  // pictureArray[i] = pictureGenerator();
  pictureArray.push(pictureGenerator());
}

// var pictureUploard = document.querySelector('.pictures');
// pictureUploard.classList.add('invisible');

var pictureTemplate = document.querySelector('#picture-template').content;
var pictureList = document.querySelector('.pictures');
var pictureListFragment = document.createDocumentFragment();

for (var j = 0; j < pictureArray.length; j++) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('img').src = pictureGenerator().url;
  pictureElement.querySelector('.picture-likes').textContent = pictureGenerator().likes;
  pictureElement.querySelector('.picture-comments').textContent = pictureGenerator().comments;

  pictureListFragment.appendChild(pictureElement);
};

pictureList.appendChild(pictureListFragment);

/////////////////////////////////////////////

console.log(pictureList);

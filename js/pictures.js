// picture.js
'use strict';

var pictureAdresses = 'pictures/{{' + numberGenerator(1, 25) + '}}.jpg';
var pictureComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'];
var pictureLikes = numberGenerator(15, 200);

function numberGenerator(minNumber, maxNumber) {
  var numberRandom = Math.random() * (maxNumber - minNumber);
  numberRandom = numberRandom.toFixed();
  return numberRandom;
}

function takeAnyValueFromArray(array) {
  return array[numberGenerator(0, array.length - 1)];
}

function pictureGenerator() {
  return {
    url: pictureAdresses,
    likes: pictureLikes,
    comments: takeAnyValueFromArray(pictureComments)
  };
}


console.log(pictureGenerator());

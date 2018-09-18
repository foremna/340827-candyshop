"use strict";

var tastes = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];

var pictures = ['gum-cedar', 'gum-chile', 'gum-eggplant', 'gum-mustard', 'gum-portwine', 'gum-wasabi', 'ice-cucumber', 'ice-eggplant', 'ice-garlic', 'ice-italian', 'ice-mushroom', 'marmalade-beer', 'marmalade-caviar', 'marmalade-corn', 'marmalade-new-year', 'marmalade-sour', 'marshmallow-bacon', 'marshmallow-beer', 'marshmallow-shrimp', 'marshmallow-spicg', 'marshmallow-wine', 'soda-bacon', 'soda-celery', 'soda-cob', 'soda-garlic', 'soda-peanut-grapes', 'soda-russian'];

var ingridients = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomBool = function(bool) {
    bool = bool || Math.random();
    if(bool >= 0.5) {
        return true;
    } else {
        return false;
    }
};

var gustos = [];

var shuffleArray = function (array) {
  array = array.slice();

  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

var randomTastesy = function (array) {
  array = shuffleArray(array);

  var randomLength = getRandomInRange(0, array.length);

  return array.slice(0, randomLength).join(', ');
};

var choiseTastes = function() {
    for (var i = 0; i < 26; i++){
        var choises = {
            name: tastes[i],
            picture: pictures[i],
            amount: getRandomInRange(0, 20),
            price: getRandomInRange(100, 1500),
            weight: getRandomInRange(30, 300),
            rating: {
                value: getRandomInRange(1, 5),
                number: getRandomInRange(10, 900)
            },
            nutritionFacts: {
                sugar: getRandomBool(),
                energy: getRandomInRange(70, 500),
                contents: randomTastesy(ingridients)
            }
        };
        gustos.push(choises);
    }
}

choiseTastes();

console.log(gustos)

var cardsAddLoad = document.querySelector('.catalog__cards');
cardsAddLoad.classList.remove('catalog__cards--load');

var cardsHiddenLoad = document.querySelector('.catalog__load');
cardsHiddenLoad.classList.add('visually-hidden');

var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.catalog__card');

var wrap = document.querySelector('.catalog__cards-wrap');

for (var i = 0; i < 26; i++) {
  var cardClone = cardTemplate.cloneNode(true);

  if (gustos[i].amount > 5) {
    cardClone.classList.add('card--in-stock');
  } else if (gustos[i].amount <= 5 && gustos[i].amount >= 1) {
    cardClone.classList.remove('card--in-stock');
    cardClone.classList.add('card--little');
  } else if (gustos[i].amount === 0) {
    cardClone.classList.remove('card--in-stock');
    cardClone.classList.add('card--soon');
  }

  var cardTitleName = cardClone.querySelector('.card__title');

  var cardImage = cardClone.querySelector('.card__img');

  var cardPrice = cardClone.querySelector('.card__price');

  var starsRating = cardClone.querySelector('.stars__rating');

  cardTitleName.textContent = gustos[i].name;
  cardImage.src = 'img/cards/' + gustos[i].picture + '.jpg';
  cardImage.alt = gustos[i].name;
  cardPrice.innerHTML = gustos[i].price + '<span class="card__currency">₽</span><span class="card__weight">/' + gustos[i].weight + ' Г </span>';

  if (gustos[i].rating.value === 4) {
    starsRating.classList.remove('stars__rating--five');
    starsRating.classList.add('stars__rating--four');
  } else if (gustos[i].rating.value === 3) {
    starsRating.classList.remove('stars__rating--five');
    starsRating.classList.add('stars__rating--three');
  } else if (gustos[i].rating.value === 2) {
    starsRating.classList.remove('stars__rating--five');
    starsRating.classList.add('stars__rating--two');
  } else if (gustos[i].rating.value === 1) {
    starsRating.classList.remove('stars__rating--five');
    starsRating.classList.add('stars__rating--one');
  }

  var starCount = cardClone.querySelector('.star__count');

  starCount.textContent = gustos[i].rating.number;

  var cardCharacteristic = cardClone.querySelector('.card__characteristic');

  if (gustos[i].nutritionFacts.sugar >= 0.5) {
    cardCharacteristic.innerHTML = '<p>Содержит сахар</p>';
  } else {
    cardCharacteristic.innerHTML = '<p>Без сахара</p>';
  }

  var compositionList = cardClone.querySelector('.card__composition-list');

  compositionList.textContent = gustos[i].nutritionFacts.contents;

  wrap.appendChild(cardClone);
}

var basket = document.querySelector('.goods__cards');

var cardOrderGoods = document.querySelector('#card-order')
  .content
  .querySelector('.goods_card');

for (i = 0; i < 3; i++) {

  var cardGoodClone = cardOrderGoods.cloneNode(true);

  if (gustos[i].amount > 5) {
    cardGoodClone.classList.add('card--in-stock');
  } else if (gustos[i].amount <= 5 && gustos[i].amount >= 1) {
    cardGoodClone.classList.remove('card--in-stock');
    cardGoodClone.classList.add('card--little');
  } else if (gustos[i].amount === 0) {
    cardGoodClone.classList.remove('card--in-stock');
    cardGoodClone.classList.add('card--soon');
  }

  cardTitleName.textContent = gustos[i].name;
  cardImage.src = 'img/cards/' + gustos[i].picture + '.jpg';
  cardImage.alt = gustos[i].name;
  cardPrice.innerHTML = gustos[i].price + '<span class="card__currency">₽</span><span class="card__weight">/' + gustos[i].weight + ' Г </span>';

  if (gustos[i].rating.value === 4) {
    starsRating.classList.remove('stars__rating--five');
    starsRating.classList.add('stars__rating--four');
  } else if (gustos[i].rating.value === 3) {
    starsRating.classList.remove('stars__rating--five');
    starsRating.classList.add('stars__rating--three');
  } else if (gustos[i].rating.value === 2) {
    starsRating.classList.remove('stars__rating--five');
    starsRating.classList.add('stars__rating--two');
  } else if (gustos[i].rating.value === 1) {
    starsRating.classList.remove('stars__rating--five');
    starsRating.classList.add('stars__rating--one');
  }

  starCount.textContent = gustos[i].rating.number;

  if (gustos[i].nutritionFacts.sugar >= 0.5) {
    cardCharacteristic.innerHTML = '<p>Содержит сахар</p>';
  } else {
    cardCharacteristic.innerHTML = '<p>Без сахара</p>';
  }

  compositionList.textContent = gustos[i].nutritionFacts.contents;

  basket.appendChild(cardGoodClone);
}

var goodCardRemove = document.querySelector('.goods__cards');

goodCardRemove.classList.remove('goods__cards--empty')

var goodEmptyAdd = document.querySelector('.goods__card-empty');

goodEmptyAdd.classList.add('visually-hidden');

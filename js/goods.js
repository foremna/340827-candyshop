'use strict';

var tastes = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];

var pictures = ['gum-cedar', 'gum-chile', 'gum-eggplant', 'gum-mustard', 'gum-portwine', 'gum-wasabi', 'ice-cucumber', 'ice-eggplant', 'ice-garlic', 'ice-italian', 'ice-mushroom', 'marmalade-beer', 'marmalade-caviar', 'marmalade-corn', 'marmalade-new-year', 'marmalade-sour', 'marshmallow-bacon', 'marshmallow-beer', 'marshmallow-shrimp', 'marshmallow-spicy', 'marshmallow-wine', 'soda-bacon', 'soda-celery', 'soda-cob', 'soda-garlic', 'soda-peanut-grapes', 'soda-russian'];

var ingridients = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomBool = function (bool) {
  bool = bool || Math.random();

  if (bool >= 0.5) {
    return true;
  } else {
    return false;
  }
};

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

var getRandomTastes = function (array) {
  array = shuffleArray(array);

  var randomLength = getRandomInRange(1, array.length);

  return array.slice(1, randomLength).join(', ');
};

var getSidewaysDataArray = function () {
  var gustos = [];
  for (var i = 0; i < 26; i++) {
    gustos[i] = {
      name: tastes[getRandomInRange(0, tastes.length - 1)],
      picture: pictures[getRandomInRange(0, pictures.length - 1)],
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
        contents: getRandomTastes(ingridients)
      }
    };
  }
  return gustos;
};

var gustos = getSidewaysDataArray();

var showCatalog = function () {
  var cardsAddLoad = document.querySelector('.catalog__cards');
  cardsAddLoad.classList.remove('catalog__cards--load');

  var cardsHiddenLoad = document.querySelector('.catalog__load');
  cardsHiddenLoad.classList.add('visually-hidden');
};

showCatalog();

var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.catalog__card');

var wrap = document.querySelector('.catalog__cards');

var createCard = function (templateNode, dataArray, parent, className, quantity) {
  if (quantity) {
    dataArray = dataArray.slice(0, quantity);
  }

  dataArray.forEach(function (it) {
    var cardClone = templateNode.cloneNode(true);

    if (it.amount > 5) {
      cardClone.classList.add('card--in-stock');
    } else if (it.amount >= 1) {
      cardClone.classList.add('card--little');
    } else if (it.amount === 0) {
      cardClone.classList.add('card--soon');
    }

    var cardTitleName = cardClone.querySelector('.' + className + '__title');
    var cardImage = cardClone.querySelector('.' + className + '__img');
    var cardPrice = cardClone.querySelector('.' + className + '__price');

    cardTitleName.textContent = it.name;
    cardImage.src = 'img/cards/' + it.picture + '.jpg';
    cardImage.alt = it.name;
    cardPrice.innerHTML = it.price + '<span class="card__currency">₽</span><span class="card__weight">/' + it.weight + ' Г </span>';

    if (cardClone.querySelector('.stars__rating')) {
      var starsRating = cardClone.querySelector('.stars__rating');

      switch (it.rating.value) {
        case 5:
          starsRating.classList.add('stars__rating--five');
          break;
        case 4:
          starsRating.classList.add('stars__rating--four');
          break;
        case 3:
          starsRating.classList.add('stars__rating--three');
          break;
        case 2:
          starsRating.classList.add('stars__rating--two');
          break;
        case 1:
          starsRating.classList.add('stars__rating--one');
          break;
        default:
          break;
      }
    }

    if (cardClone.querySelector('.star__count')) {
      var starCount = cardClone.querySelector('.star__count');
      starCount.textContent = it.rating.number;
    }

    if (cardClone.querySelector('.card__characteristic')) {
      var cardCharacteristic = cardClone.querySelector('.card__characteristic');
      cardCharacteristic.innerHTML = it.nutritionFacts.sugar >= 0.5 ? '<p>Содержит сахар</p>' : '<p>Без сахара</p>';
    }

    if (cardClone.querySelector('.card__composition-list')) {
      var compositionList = cardClone.querySelector('.card__composition-list');
      compositionList.textContent = it.nutritionFacts.contents;
    }

    parent.appendChild(cardClone);
  });
};

createCard(cardTemplate, gustos, wrap, 'card');

var basket = document.querySelector('.goods__cards');

var cardOrderGoods = document.querySelector('#card-order')
  .content
  .querySelector('.goods_card');

createCard(cardOrderGoods, gustos, basket, 'card-order', 3);

var showGood = function () {
  var goodCardRemove = document.querySelector('.goods__cards');

  goodCardRemove.classList.remove('goods__cards--empty');

  var goodEmptyAdd = document.querySelector('.goods__card-empty');

  goodEmptyAdd.classList.add('visually-hidden');
};

showGood();

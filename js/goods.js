'use strict';

var tastes = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
var pictures = ['gum-cedar', 'gum-chile', 'gum-eggplant', 'gum-mustard', 'gum-portwine', 'gum-wasabi', 'ice-cucumber', 'ice-eggplant', 'ice-garlic', 'ice-italian', 'ice-mushroom', 'marmalade-beer', 'marmalade-caviar', 'marmalade-corn', 'marmalade-new-year', 'marmalade-sour', 'marshmallow-bacon', 'marshmallow-beer', 'marshmallow-shrimp', 'marshmallow-spicy', 'marshmallow-wine', 'soda-bacon', 'soda-celery', 'soda-cob', 'soda-garlic', 'soda-peanut-grapes', 'soda-russian'];
var ingridients = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];
var headerBasket = document.querySelector('.main-header__basket');

// Цена товара // на будущее - чтобы не забыть
// var MIN_PRICE = 100;
// var MAX_PRICE = 1500;

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomBool = function () {
  return Math.random() < 0.5;
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
  var shuffledNames = shuffleArray(tastes);
  for (var i = 0; i < 26; i++) {
    gustos[i] = {
      name: shuffledNames[i],
      picture: pictures[getRandomInRange(0, pictures.length - 1)],
      amount: getRandomInRange(0, 20),
      price: getRandomInRange(100, 1500),
      weight: getRandomInRange(30, 300),
      rating: {
        value: getRandomInRange(1, 5),
        number: getRandomInRange(1, 10)
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
var cards = document.querySelector('.catalog__cards');

var showCatalog = function () {
  cards.classList.remove('catalog__cards--load');

  var cardsHiddenLoad = document.querySelector('.catalog__load');
  cardsHiddenLoad.classList.add('visually-hidden');
};

showCatalog();

var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.catalog__card');

var createCard = function (node, data, className) {
  if (data.amount > 5) {
    node.classList.add('card--in-stock');
  } else if (data.amount >= 1) {
    node.classList.add('card--little');
  } else if (data.amount === 0) {
    node.classList.add('card--soon');
  }

  var cardTitleName = node.querySelector('.' + className + '__title');
  var cardImage = node.querySelector('.' + className + '__img');
  var cardPrice = node.querySelector('.' + className + '__price');

  cardTitleName.textContent = data.name;
  cardImage.src = 'img/cards/' + data.picture + '.jpg';
  cardImage.alt = data.name;
  cardPrice.innerHTML = data.price + '<span class="card__currency">₽</span><span class="card__weight">/' + data.weight + ' Г </span>';

  if (node.querySelector('.stars__rating')) {
    var starsRating = node.querySelector('.stars__rating');

    switch (data.rating.value) {
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

  if (node.querySelector('.star__count')) {
    var starCount = node.querySelector('.star__count');
    // ДОБАВТЬ ПРОВЕРКУ НА КЛАСС "card__composition--hidden"

    starCount.textContent = data.amount;
  }

  if (node.querySelector('.card__characteristic')) {
    var cardCharacteristic = node.querySelector('.card__characteristic');
    cardCharacteristic.innerHTML = data.nutritionFacts.sugar ? '<p>Содержит сахар</p>' : '<p>Без сахара</p>';
  }

  if (node.querySelector('.card__composition-list')) {
    var compositionList = node.querySelector('.card__composition-list');
    compositionList.textContent = data.nutritionFacts.contents;
  }

  if (node.querySelector('.card-order__count')) {
    node.querySelector('.card-order__count').value = 0;
  }

};

var createCards = function (templateNode, dataArray, parent, className) {
  dataArray.forEach(function (it) {
    var cardClone = templateNode.cloneNode(true);

    createCard(cardClone, it, className);
    it.element = cardClone;
    parent.appendChild(cardClone);
  });
};

var basket = document.querySelector('.goods__cards');
var cardOrderGoods = document.querySelector('#card-order').content.querySelector('.goods_card');

var catalogCards = document.querySelector('.catalog__cards');
var basketData = [];

// Добавляет товар в избранное и удаляет товар из избранного
var toggleFavorite = function (element) {
  element.classList.toggle('card__btn-favorite--selected');
};

var onCatalogClick = function (e) {
  var target = e.target;
  if (target.classList.contains('card__btn-favorite')) {
    e.preventDefault();
    toggleFavorite(target);
  }
};

catalogCards.addEventListener('click', onCatalogClick);

var increaseAmount = function (title, item, currentItem) {
  currentItem.amount--;
  var basketProduct = basketData.find(function (elem) {
    return elem.name === title;
  });
  basketProduct.orderedAmount++;
  item.querySelector('.star__count').textContent = currentItem.amount;
  var goodsCards = document.querySelectorAll('.goods_card');
  var targetBasketCard = Array.prototype.find.call(goodsCards, function (elem) {
    return elem.querySelector('.card-order__title').textContent === title;
  });
  var targetAmount = parseInt(targetBasketCard.querySelector('.card-order__count').value, 10);
  targetBasketCard.querySelector('.card-order__count').value = ++targetAmount;
  targetBasketCard.querySelector('.card-order__price').innerHTML = basketProduct.price * targetAmount + '<span class="card__currency">₽</span><span class="card__weight">/' + basketProduct.weight * targetAmount + ' Г </span>';
};

var decreaseAmount = function (title, item, currentItem) {
  currentItem.amount++;
  var basketProduct = basketData.find(function (elem) {
    return elem.name === title;
  });
  basketProduct.orderedAmount--;
  item.querySelector('.star__count').textContent = currentItem.amount;
  var goodsCards = document.querySelectorAll('.goods_card');
  var targetBasketCard = Array.prototype.find.call(goodsCards, function (elem) {
    return elem.querySelector('.card-order__title').textContent === title;
  });
  var targetAmount = parseInt(targetBasketCard.querySelector('.card-order__count').value, 10);
  targetBasketCard.querySelector('.card-order__count').value = --targetAmount;
  targetBasketCard.querySelector('.card-order__price').innerHTML = basketProduct.price * targetAmount + '<span class="card__currency">₽</span><span class="card__weight">/' + basketProduct.weight * targetAmount + ' Г </span>';
};

var addProductToBasket = function (product) {
  // Определяем название товара
  var title = product.querySelector('.card__title').textContent;
  var isInBasket = basketData.some(function (elem) {
    return elem.name === title;
  });
  var currentProduct = gustos.find(function (elem) {
    return elem.name === title;
  });
  if (!isInBasket) {
    // Создаем копию объекта с данными по товару, который мы выбрали
    var targetProduct = gustos.find(function (it) {
      return it.name === title;
    });
    var productData = Object.assign({}, targetProduct, {orderedAmount: 0});
    delete productData.amount;
    basketData.push(productData);
    createCards(cardOrderGoods, [productData], basket, 'card-order');
  }

  if (currentProduct.amount) {
    increaseAmount(title, product, currentProduct);
  }

  sumPrice();
};

var goodCardRemove = document.querySelector('.goods__cards');
var goodEmptyAdd = document.querySelector('.goods__card-empty');

var showGood = function () {
  goodCardRemove.classList.remove('goods__cards--empty');
  goodEmptyAdd.classList.add('visually-hidden');
};

var toShow = function () {
  goodCardRemove.classList.add('goods__cards--empty');
  goodEmptyAdd.classList.remove('visually-hidden');
};

var onCardsClick = function (evt) {
  if (evt.target.classList.contains('card__btn')) {
    evt.preventDefault();
    addProductToBasket(evt.target.closest('.catalog__card'));
  }
};

createCards(cardTemplate, gustos, cards, 'card');

cards.addEventListener('click', onCardsClick);

var addProductToCard = function (e) {
  var cardOrder = e.target.closest('.card-order');
  var cardCount = cardOrder.querySelector('.card-order__count');
  var cardName = cardOrder.querySelector('.card-order__title').textContent;
  var goodsCards = document.querySelectorAll('.catalog__card');
  var targetGoodsCard = Array.prototype.find.call(goodsCards, function (elem) {
    return elem.querySelector('.card__title').textContent === cardName;
  });
  var currentProduct = gustos.find(function (elem) {
    return elem.name === cardName;
  });
  if (e.target.classList.contains('card-order__btn--decrease')) {
    decreaseAmount(cardName, targetGoodsCard, currentProduct);

    if (cardCount.value < 1) {
      basketData = basketData.filter(function (elem) {
        return elem.name !== cardName;
      });
      basket.removeChild(cardOrder);
      toShow();
    }
  }

  if (e.target.classList.contains('card-order__btn--increase')) {
    if (currentProduct.amount) {
      increaseAmount(cardName, targetGoodsCard, currentProduct);
    }
  }

  if (e.target.classList.contains('card-order__close')) {
    e.preventDefault();
    var productQuantity = parseInt(targetGoodsCard.querySelector('.star__count').textContent, 10);
    targetGoodsCard.querySelector('.star__count').textContent = productQuantity + parseInt(cardCount.value, 10);
    currentProduct.amount = productQuantity + parseInt(cardCount.value, 10);
    basketData = basketData.filter(function (elem) {
      return elem.name !== cardName;
    });
    basket.removeChild(cardOrder);
    toShow();
  }

  sumPrice();
};

basket.addEventListener('click', addProductToCard);

var sumPrice = function () {
  var totalQuantity = basketData.reduce(function (acc, cur) {
    return acc + cur.orderedAmount;
  }, 0);
  var totalCost = 0;
  basketData.forEach(function (elem) {
    totalCost += elem.orderedAmount * elem.price;
  });

  if (totalQuantity > 0) {
    headerBasket.textContent = 'В корзине ' + totalQuantity + ' товара на ' + totalCost + 'Р';
    showGood();
  } else {
    headerBasket.textContent = 'В корзине ничего нет';
    toShow();
  }
};

// Находим на странице поле оформления заказа

var orderForm = document.querySelector('#order');
var payment = orderForm.querySelector('.payment');
var paymentInputsBlock = orderForm.querySelector('.payment__inputs');
var paymentCash = payment.querySelector('.payment__cash-wrap');
var paymentCard = payment.querySelector('.payment__card-wrap');
var paymentBlock = document.querySelector('.payment__method');
var paymentCardInput = payment.querySelector('input[id=payment__card]');
// var paymentCashInput = payment.querySelector('input[id=payment__cash]');

// Переключение способа оплаты

var onPaymentBlockChange = function () {
  paymentCard.classList.toggle('visually-hidden');
  paymentCash.classList.toggle('visually-hidden');
  var paymentInputs = paymentInputsBlock.querySelectorAll('input');
  paymentInputs.forEach(function (input) {
    input.toggleAttribute('disabled');
  });
};

paymentBlock.addEventListener('change', onPaymentBlockChange);

// Находим блок оформения доставки
var delivery = orderForm.querySelector('.deliver');
var deliveryStore = delivery.querySelector('.deliver__store');
var deliveryCourier = delivery.querySelector('.deliver__courier');
var deliveryBlock = document.querySelector('.deliver__toggle');
var deliveryFields = deliveryCourier.querySelector('.deliver__entry-fields-wrap');
var deliveryInputs = deliveryFields.querySelectorAll('.text-input__input', '.deliver__textarea');
var deliveryStoreInput = orderForm.querySelector('input[id=deliver__store]');
// var deliveryCourierInput = orderForm.querySelector('input[id=deliver__courier]');

// Переключение способа доставки

var switchDeliveryMethods = function () {
  deliveryStore.classList.toggle('visually-hidden'); // Способ номер один
  deliveryCourier.classList.toggle('visually-hidden');

  deliveryInputs.forEach(function (input) {
    input.toggleAttribute('disabled');
  });

  // if (deliveryStoreInput.checked) { // Способ номер два
  //   deliveryInputs.forEach(function (input) {
  //     input.disabled = true;
  //   });
  // } else {
  //   deliveryInputs.forEach(function (input) {
  //     input.disabled = false;
  //   });
  // }
};

deliveryBlock.addEventListener('change', switchDeliveryMethods);

// Кнопки ползунка цены

var range = document.querySelector('.range');
var rangeFilter = range.querySelector('.range__filter'); // Сам фильтр
var rangeFilterFill = range.querySelector('.range__fill-line'); // Фиолетовая линия
var rangeBtnLeft = range.querySelector('.range__btn--left'); // Левый ползунок
var rangeBtnRight = range.querySelector('.range__btn--right'); // Правый ползунок
var minPriceFilter = range.querySelector('.range__price--min'); // Окошечко минимальной цены
var maxPriceFilter = range.querySelector('.range__price--max'); // Окошечко максимальной цены
var min = parseInt(getComputedStyle(rangeBtnLeft).left, 10);
var max = parseInt(getComputedStyle(rangeBtnRight).left, 10);
var MIN = 0;
var MAX = 245;
var FILTER_WIDTH = 245;

// Работа фильтра по выбору диапазона цены

function getResultMinMax(minValue, maxValue) {
  minPriceFilter.textContent = parseInt(minValue, 10);
  maxPriceFilter.textContent = parseInt(maxValue, 10);
}

getResultMinMax(min, max); // Координаты слайдера range
var rangeFilterCoordinate = getCoordinates(rangeFilter);

rangeBtnLeft.addEventListener('mousedown', rangeBtnLeftPressMouse);
rangeBtnRight.addEventListener('mousedown', rangeBtnRightPressMouse);

function rangeBtnLeftPressMouse(evt) {
  var elMinCoords = getCoordinates(rangeBtnLeft);
  var shiftX = evt.pageX - elMinCoords.left;
  document.addEventListener('mousemove', rangeBtnLeftPressMoveMouse);

  function rangeBtnLeftPressMoveMouse(e) {
    getLeftFilterCoorditanes(e, shiftX);
  }

  document.addEventListener('mouseup', rangeBtnLeftPressUpMouse);

  function rangeBtnLeftPressUpMouse(event) {
    getLeftFilterCoorditanes(event, shiftX);
    getResultMinMax(min, max);

    document.removeEventListener('mousemove', rangeBtnLeftPressMoveMouse);
    document.removeEventListener('mouseup', rangeBtnLeftPressUpMouse);
  }
  return false;
}

function getLeftFilterCoorditanes(e, shiftX) {
  var newLeft = e.pageX - shiftX - rangeFilterCoordinate.left;

  if (newLeft < MIN) {
    newLeft = MIN;
  }
  if (newLeft > max - rangeBtnLeft.offsetWidth / 2) {
    newLeft = max - rangeBtnLeft.offsetWidth / 2;
  }
  min = newLeft;
  rangeBtnLeft.style.left = newLeft + 'px';
  rangeFilterFill.style.left = (newLeft + rangeBtnLeft.offsetWidth / 2) + 'px';
}

function rangeBtnRightPressMouse(evt) {
  var elMaxCoords = getCoordinates(rangeBtnRight);
  var shiftX = evt.pageX - elMaxCoords.left;
  document.addEventListener('mousemove', rangeBtnRightPressMoveMouse);

  function rangeBtnRightPressMoveMouse(e) {
    getRightFilterCoordinates(e, shiftX);
  }

  document.addEventListener('mouseup', rangeBtnRightPressUpMouse);

  function rangeBtnRightPressUpMouse(event) {
    getRightFilterCoordinates(event, shiftX);
    getResultMinMax(min, max);

    document.removeEventListener('mousemove', rangeBtnRightPressMoveMouse);
    document.removeEventListener('mouseup', rangeBtnRightPressUpMouse);
  }
  return false;
}

function getRightFilterCoordinates(e, shiftX) {
  var newRight = e.pageX - shiftX - rangeFilterCoordinate.left;

  if (newRight > MAX) {
    newRight = MAX;
  }

  if (newRight < min + rangeBtnLeft.offsetWidth / 2) {
    newRight = min + rangeBtnLeft.offsetWidth / 2;
  }

  max = newRight;
  rangeBtnRight.style.left = newRight + 'px';
  rangeFilterFill.style.right = FILTER_WIDTH - newRight + 'px';
}

function getCoordinates(elem) {
  var elCoords = elem.getBoundingClientRect();

  return {
    top: elCoords.top + pageYOffset,
    left: elCoords.left + pageXOffset,
  };
}

// Оплата заказа

var numberCvcCard = paymentCard.querySelector('input[name=card-cvc]');
var periodCard = paymentCard.querySelector('input[name=card-date]');
var inputCardNumbers = paymentCard.querySelector('input[name=card-number]');
var holderCard = paymentCard.querySelector('input[name=cardholder]');
var paymentStatus = paymentCard.querySelector('.payment__card-status');

// Алгоритм Луна

var checkCardNumberValidity = function (value) {
  var cardData = value;
  var cardDataArray = cardData.split('');
  var cardDataArraySum = cardDataArray.map(function (item) {
    return parseInt(item, 10);
  }).map(function (item) {
    return item % 2 !== 0 ? item * 2 : item;
  }).map(function (item) {
    return item > 10 ? item - 9 : item;
  }).reduce(function (sum, current) {
    return sum + current;
  }, 0);
  return cardDataArraySum % 10 === 0;
};
// Если поля пустые

var validations = {
  inputCardNumbers: false,
  periodCard: false,
  numberCvcCard: false,
  holderCard: false
};

// Одобряем карту при валидации полей и верной карты

paymentCard.addEventListener('input', function (evt) {
  evt.target.checkValidity();
  if (evt.target === inputCardNumbers) {
    validations.inputCardNumbers = checkCardNumberValidity(evt.target.value);
  }
  if (evt.target === periodCard) {
    validations.periodCard = periodCard.checkValidity();
  }
  if (evt.target === numberCvcCard) {
    validations.numberCvcCard = numberCvcCard.checkValidity();
  }
  if (evt.target === holderCard) {
    validations.holderCard = holderCard.checkValidity();
  }
  paymentStatus.textContent = (validations.inputCardNumbers && validations.periodCard && validations.numberCvcCard && validations.holderCard) ? 'одобрен' : 'не определён';
});

// Проверка полей на верность введенных данных

inputCardNumbers.addEventListener('invalid', function () { // Валидация карты
  // inputCardNumbers.validity.patternMismatch ? inputCardNumbers.setCustomValidity('Номер карты состоит из 16-ти цифр') : inputCardNumbers.setCustomValidity('');
  inputCardNumbers.setCustomValidity(inputCardNumbers.validity.patternMismatch ? 'Номер карты состоит из 16-ти цифр' : '');
});

periodCard.addEventListener('invalid', function () { // Валидация поля мм/гг
  // periodCard.validity.patternMismatch ? periodCard.setCustomValidity('Пожалуйста, введите срок действия карты в формате мм/гг (месяц/год)') : periodCard.setCustomValidity('');
  periodCard.setCustomValidity(periodCard.validity.patternMismatch ? 'Пожалуйста, введите срок действия карты в формате мм/гг (месяц/год)' : '');
});

numberCvcCard.addEventListener('invalid', function () { // Валидация поля cvc
  // numberCvcCard.validity.patternMismatch ? numberCvcCard.setCustomValidity('CVC Должен состоять из 3-х цифр. Узнать его можно на оборотной стороне карты') : numberCvcCard.setCustomValidity('');
  numberCvcCard.setCustomValidity(numberCvcCard.validity.patternMismatch ? 'CVC Должен состоять из 3-х цифр. Узнать его можно на оборотной стороне карты' : '');
});

// Станции метро // Осуществление переключения по адресу

var subwayStation = {
  'store-academicheskaya': {
    src: 'img/map/academicheskaya.jpg',
    describe: 'проспект Науки, д. 19, корп. 3, литер А, ТК «Платформа», 3-й этаж, секция 310'
  },

  'store-vasileostrovskaya': {
    src: 'img/map/vasileostrovskaya.jpg',
    describe: 'м. Василеостровская, д. 59, корп. 3, 3-й этаж, секция 210'
  },

  'store-rechka': {
    src: 'img/map/rechka.jpg',
    describe: 'м. Черная речка, д. 16, 1-й этаж'
  },

  'store-petrogradskaya': {
    src: 'img/map/petrogradskaya.jpg',
    describe: 'м. Петроградская, д. 89, корп. 3, литер А, 3-й этаж, секция 310'
  },

  'store-proletarskaya': {
    src: 'img/map/proletarskaya.jpg',
    describe: 'м. Пролетарская, д. 75, корп. 4, 2-й этаж'
  },

  'store-vostaniya': {
    src: 'img/map/vostaniya.jpg',
    describe: 'м. Восстания, д. 44, корп. 7, 2-й этаж'
  },

  'store-prosvesheniya': {
    src: 'img/map/prosvesheniya.jpg',
    describe: 'м. Просвещения, д. 19, корп. 4, 1-й этаж'
  },

  'store-frunzenskaya': {
    src: 'img/map/frunzenskaya.jpg',
    describe: 'м. Пролетарская, д. 75, корп. 4, 2-й этаж'
  },

  'store-chernishevskaya': {
    src: 'img/map/chernishevskaya.jpg',
    describe: 'м. Чернышевская, д. 75, корп. 4, 2-й этаж'
  },

  'store-tehinstitute': {
    src: 'img/map/tehinstitute.jpg',
    describe: 'м. Технологический институт, д. 55, корп. 7, 3-й этаж'
  }
};

// По нажатии на метро выбираешь конкретное

var listSubways = orderForm.querySelector('.deliver__store-list'); // Список всех станций метро
var mapImageSubways = orderForm.querySelector('.deliver__store-map-img'); // Изображения карт станций метро
var describeSubways = orderForm.querySelector('.deliver__store-describe'); // Адрес метро

listSubways.addEventListener('change', function (evt) {
  mapImageSubways.src = subwayStation[evt.target.id].src;
  describeSubways.textContent = subwayStation[evt.target.id].describe;
});

var submitWrap = document.querySelector('.buy__submit-btn-wrap'); // Контейнер с кнопкой
var btnSubmit = submitWrap.querySelector('.buy__submit-btn'); // Кнопка отправки форм заказа

var cardInputChecked = function () { // Функция делает чекнутой кнопку "Банковская карта"
  paymentCardInput.checked();
};

var deliveryInputChecked = function () { // Функция делает чекнутой кнопку "Заеду"
  deliveryStoreInput.checked();
};

var resetSettings = function () { // Функция очищает все поля ввода
  var allInput = payment.querySelectorAll('input');
  allInput.forEach(function (input) {
    input.value = '';
  });

  cardInputChecked();
  deliveryInputChecked();
};

btnSubmit.addEventListener('submit', resetSettings); // При нажатии на кнопку "Заверните" очищаются поля и радиокнопки приводятся в состояние по умолчанию

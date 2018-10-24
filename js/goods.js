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

// Переключение способа доставки
var switchDeliveryMethods = function () {
  deliveryCourier.classList.toggle('visually-hidden');
  deliveryStore.classList.toggle('visually-hidden');
  var deliveryInputs = deliveryCourier.querySelectorAll('input, textarea');
  deliveryInputs.forEach(function (input) {
    input.toggleAttribute('disabled');
  });
};

deliveryBlock.addEventListener('change', switchDeliveryMethods);

// Кнопки ползунка цены
var rangeFilter = document.querySelector('.range__filter');
var maxPriceFilter = document.querySelector('.range__price--max');
var minPriceFilter = document.querySelector('.range__price--min');


// // Работа ползунка цены товаров

var countsPercentageWidth = function (evt) {
  var priceBarWidth = rangeFilter.clientWidth;
  var priceBarWidthHardCode = 100;
  if (evt.target.classList.contains('range__btn--right')) {
    maxPriceFilter.textContent = Math.round(priceBarWidthHardCode * (evt.target.offsetLeft / priceBarWidth));
  } else if (evt.target.classList.contains('range__btn--left')) {
    minPriceFilter.textContent = Math.round(priceBarWidthHardCode * (evt.target.offsetLeft / priceBarWidth));
  }
};

rangeFilter.addEventListener('mouseup', countsPercentageWidth);

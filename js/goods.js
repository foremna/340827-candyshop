'use strict';

var tastes = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
var pictures = ['gum-cedar', 'gum-chile', 'gum-eggplant', 'gum-mustard', 'gum-portwine', 'gum-wasabi', 'ice-cucumber', 'ice-eggplant', 'ice-garlic', 'ice-italian', 'ice-mushroom', 'marmalade-beer', 'marmalade-caviar', 'marmalade-corn', 'marmalade-new-year', 'marmalade-sour', 'marshmallow-bacon', 'marshmallow-beer', 'marshmallow-shrimp', 'marshmallow-spicy', 'marshmallow-wine', 'soda-bacon', 'soda-celery', 'soda-cob', 'soda-garlic', 'soda-peanut-grapes', 'soda-russian'];
var ingridients = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];
var basketDataObj = {};
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
  for (var i = 0; i < 26; i++) {
    gustos[i] = {
      name: tastes[getRandomInRange(0, tastes.length - 1)],
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
var wrap = document.querySelector('.catalog__cards');

var showCatalog = function () {
  wrap.classList.remove('catalog__cards--load');

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

/**
 * Функция добавляет выбранный товар в корзину
 * @param {Node} node
 */
var addProductBasket = function (node) {
  // Определяем название товара
  var title = node.querySelector('.card__title').textContent;
  // Создаем копию объекта с данными по товару, который мы выбрали
  var productData = Object.assign({}, gustos.find(function (it) {
    return it.name === title;
  }));

  // Проверяем, находится ли уже в корзине выбранный товар, возвращаем true, если да.
  var isInBasket = Object.keys(basketDataObj).some(function (it) {
    return it === productData.name;
  });

  // Если товар уже в корзине, увеличиваем его количество на 1, иначе создаем карточку товара и отрисовываем ее в корзине
  if (isInBasket) {
    basketDataObj[productData.name].element.querySelector('.card-order__count').value++;
    var productDataQuantity = node.querySelector('.star__count').textContent;
    node.querySelector('.star__count').textContent = --productDataQuantity;
  } else {
    createCards(cardOrderGoods, [productData], basket, 'card-order');
    productData.productCard = node;
    basketDataObj[productData.name] = productData;
    var productQuantity = node.querySelector('.star__count').textContent;
    node.querySelector('.star__count').textContent = --productQuantity;
  }

  sumPrice(basket);
};

var showGood = function () {
  var goodCardRemove = document.querySelector('.goods__cards');
  var goodEmptyAdd = document.querySelector('.goods__card-empty');

  goodCardRemove.classList.remove('goods__cards--empty');
  goodEmptyAdd.classList.add('visually-hidden');
};

var toShow = function () {
  var goodCardRemove = document.querySelector('.goods__cards');
  var goodEmptyAdd = document.querySelector('.goods__card-empty');

  goodCardRemove.classList.add('goods__cards--empty');
  goodEmptyAdd.classList.remove('visually-hidden');
};

var onWrapClick = function (evt) {
  if (evt.target.classList.contains('card__btn')) {
    evt.preventDefault();
    addProductBasket(evt.target.closest('.catalog__card'));
  }
};

createCards(cardTemplate, gustos, wrap, 'card');

wrap.addEventListener('click', onWrapClick);

var catalogCards = document.querySelector('.catalog__cards');

// Добавляет товар в избранное
var toggleFavoriteClass = function (element) {
  element.classList.toggle('card__btn-favorite--selected');
};

var favoriteToggle = function (e) {
  if (e.target.classList.contains('card__btn-favorite')) {
    toggleFavoriteClass();
  }
};

catalogCards.addEventListener('click', favoriteToggle());

basket.addEventListener('click', function (e) {
  if (e.target.classList.contains('card-order__btn--decrease')) {
    var cardOrder = e.target.closest('.card-order');
    var cardCount = cardOrder.querySelector('.card-order__count');
    var cardName = cardOrder.querySelector('.card-order__title').textContent;
    var productCard = basketDataObj[cardName].productCard;
    var availabilityProduct = parseInt(productCard.querySelector('.star__count').textContent, 10);
    var cardPrice = cardOrder.querySelector('.card-order__price');

    cardCount.value--;
    productCard.querySelector('.star__count').textContent = ++availabilityProduct;

    changeCost(cardPrice, cardName, cardCount);
    changeWeight(cardPrice, cardName, cardCount);
    sumPrice(basket);

    if (cardCount.value < 1) {
      var nameCard = cardOrder.querySelector('.card-order__title').textContent;

      delete basketDataObj[nameCard];
      basket.removeChild(cardOrder);
      toShow();
    }
  }

  if (e.target.classList.contains('card-order__btn--increase')) {
    cardOrder = e.target.closest('.card-order');
    cardCount = cardOrder.querySelector('.card-order__count');
    cardName = cardOrder.querySelector('.card-order__title').textContent;
    cardPrice = cardOrder.querySelector('.card-order__price');

    productCard = basketDataObj[cardName].productCard;
    availabilityProduct = +productCard.querySelector('.star__count').textContent;

    if (availabilityProduct > 0) {
      cardCount.value++;
      productCard.querySelector('.star__count').textContent = --availabilityProduct;
    }

    changeCost(cardPrice, cardName, cardCount);
    changeWeight(cardPrice, cardName, cardCount);
    sumPrice(basket);
  }

  if (e.target.classList.contains('card-order__close')) {
    e.preventDefault();
    cardOrder = e.target.closest('.card-order');
    cardCount = cardOrder.querySelector('.card-order__count');
    cardName = cardOrder.querySelector('.card-order__title').textContent;
    productCard = basketDataObj[cardName].productCard;
    var productQuantity = parseInt(productCard.querySelector('.star__count').textContent, 10);
    productCard.querySelector('.star__count').textContent = productQuantity + parseInt(cardCount.value, 10);

    delete basketDataObj[cardName];
    basket.removeChild(cardOrder);
    toShow();
  }
});

// Функция увеличивающая стоимость выбранного товара, в зависимости от его количества
var changeCost = function (node, name, count) {
  var beginSpan = node.innerHTML.indexOf('<');
  var markupSpan = node.innerHTML.slice(beginSpan);

  node.innerHTML = basketDataObj[name].price * count.value + markupSpan;
};

// Функция увеличивающая вес выбранного товара, в зависимости от его количества
var changeWeight = function (node, name, count) {
  var cardWeight = node.querySelector('.card__weight');

  cardWeight.textContent = '/' + basketDataObj[name].weight * count.value + ' Г ';
};

var sumPrice = function (parent) {
  var allProducts = parent.querySelectorAll('.goods_card');
  var totalCost = 0;
  var totalQuantity = 0;

  allProducts.forEach(function (it) {
    var cost = it.querySelector('.card-order__price').textContent;
    var quantity = it.querySelector('.card-order__count').value;
    totalCost += parseInt(cost, 10);
    totalQuantity += parseInt(quantity, 10);
  });

  if (totalQuantity > 0) {
    headerBasket.textContent = 'В корзине ' + totalQuantity + ' товара на ' + totalCost + 'Р';
    showGood();
  } else {
    headerBasket.textContent = 'В корзине ничего нет';
    toShow();
  }
};

// var increaseQuantityProduct = function  () {
// };

// Находим на странице поле оформления заказа
var orderForm = document.querySelector('#order');
var payment = orderForm.querySelector('.payment');
var paymentCash = payment.querySelector('.payment__cash-wrap');
var paymentCard = payment.querySelector('.payment__card-wrap');

// Отключаем/включаем поле оформления заказа
var disabledInput = function (element, isDisable) {
  var inputsPayment = element.querySelectorAll('input');
  for (var i = 0; i < inputsPayment.length; i++) {
    inputsPayment[i].disabled = isDisable;
  }
};

// Переключение способа оплаты
var switchPaymentMethods = function (evt) {
  if (evt.target.id === 'payment__cash') {
    paymentCash.classList.remove('visually-hidden');
    paymentCard.classList.add('visually-hidden');
    disabledInput(paymentCard, true);
  } else if (evt.target.id === 'payment__card') {
    paymentCard.classList.remove('visually-hidden');
    paymentCash.classList.add('visually-hidden');
    disabledInput(paymentCard, false);
  }
};

payment.addEventListener('click', switchPaymentMethods);

// Находим блок оформения доставки
var delivery = orderForm.querySelector('.deliver');
var deliveryStore = delivery.querySelector('.deliver__store');
var deliveryCourier = delivery.querySelector('.deliver__courier');

// Переключение способа доставки
var switchDeliveryMethods = function (evt) {
  if (evt.target.id === 'deliver__courier') {
    deliveryCourier.classList.remove('visually-hidden');
    deliveryStore.classList.add('visually-hidden');
    disabledInput(deliveryCourier, false);
  } else if (evt.target.id === 'deliver__store') {
    deliveryStore.classList.remove('visually-hidden');
    deliveryCourier.classList.add('visually-hidden');
    disabledInput(deliveryCourier, true);
  }
};

delivery.addEventListener('click', switchDeliveryMethods);

// Кнопки ползунка цены
var rangeFilter = document.querySelector('.range__filter');
// на будущее задание var rangeBtnRight = rangeFilter.querySelector('.range__btn--right');
var rangeBtnLeft = rangeFilter.querySelector('.range__btn--left');


// // Работа ползунка цены товаров

var coordBtnLeft = rangeBtnLeft.offsetLeft;
var rangeWidth = rangeFilter.offsetWidth;

var countsPercentageWidth = function () {
  var procent = 100;
  return coordBtnLeft / procent * rangeWidth;
};

rangeBtnLeft.addEventListener('mouseup', countsPercentageWidth);

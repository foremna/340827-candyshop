'use sctict';

var tastes = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];

var pictures = ['gum-cedar.jpg', 'gum-chile.jpg', 'gum-eggplant.jpg', 'gum-mustard.jpg', 'gum-portwine.jpg', 'gum-wasabi.jpg', 'ice-cucumber.jpg', 'ice-eggplant.jpg', 'ice-garlic.jpg', 'ice-italian.jpg', 'ice-mushroom.jpg', 'marmalade-beer.jpg', 'marmalade-caviar.jpg', 'marmalade-corn.jpg', 'marmalade-new-year.jpg', 'marmalade-sour.jpg', 'marshmallow-bacon.jpg', 'marshmallow-beer.jpg', 'marshmallow-shrimp.jpg', 'marshmallow-spicy.jpg', 'marshmallow-wine.jpg', 'soda-bacon.jpg', 'soda-celery.jpg', 'soda-cob.jpg', 'soda-garlic.jpg', 'soda-peanut-grapes.jpg', 'soda-russian.jpg'];

var contents = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];

var choiseTastes = function(){
    var gustos = [];
    for (var i = 0; i < 26; i++){
        var choises = {
            name: ; //Вкусы ведь в массиве tastes
            picture: ,
            amount: (0, 20),
            price: (100, 1500),
            weight {
                value: Math.random(1, 5,
                number: Math.random(10, 900)
            },
            nutritionFacts {
                var sugar = function(){
                    return.Math.random() > 0.3;
                };
            },
            energy: Math.random(70, 500),
    };
};

var cardsAddLoad = document.querySelector('.catalog__cards');
cardsAddLoad.classList.remove('catalog__cards--load');

var cardsHiddenLoad = document.querySelector('.catalog__load'); cardsHiddenLoad.classList.add('visually-hidden');
    
var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.catalog__card');

var templateStyle = document.querySelector('#card');
    
templateStyle.setAttribute ('style', 'display: block;');
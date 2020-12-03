function decMonth(numb) {
    switch (parseInt(numb)) {
        case 1:
            return '1 месяц';
            break;
        case 3:
            return '3 месяца';
            break;
        case 6:
            return '6 месяцев';
            break;
        case 12:
            return '12 месяцев';
            break;
    }
}
function sortOptions(arrOptions) {
    arrOptions.sort(function (a, b) {
        if (a.ID > b.ID) {
            return 1;
        }
        if (a.ID < b.ID) {
            return -1;
        }
        return 0;
    })
}
function minMaxPrice(arrOptions) {
    let arrPrice = [];
    for(let item in arrOptions){
        arrPrice.push(parseInt(arrOptions[item].price))
    }
    let minPrice = Math.min.apply(null, arrPrice);
    let maxPrice = Math.max.apply(null, arrPrice);
    return {min: minPrice, max: maxPrice};
}
function convertDate(date) {
    let splitTimestamp = date.split('+');
    let myDate = new Date(splitTimestamp[0]*1000);
    return myDate.toLocaleDateString();
}


document.addEventListener('DOMContentLoaded', function() {


    var cardOne = document.querySelectorAll('.card__first-page');
    var cardTwo = document.querySelectorAll('.card__second-page');
    var cardThree = document.querySelectorAll('.card__third-page');

    var cardThreeOptions = {};

    [].forEach.call(cardTwo,function(el){
        el.addEventListener('click', function (e) {
            document.getElementById('section-one').style.display = "none";
            let section = document.getElementById('section-two');
            section.style.display = "flex";
            sortOptions(tariffOptions[el.dataset.card]);
            let minMax = minMaxPrice(tariffOptions[el.dataset.card]);
            section.innerHTML =
                '<div class="card card_two">'+
                '<div id="arrow1" class="card__top-arrow"><img src="img/arrow-green.svg" alt=""></div>'+
                '<div class="card__top-title">Тариф "'+ tariffOptions[el.dataset.card][0].title +'"</div>'+
                '</div>';
            for(let item in tariffOptions[el.dataset.card]){
                let contentCard = tariffOptions[el.dataset.card][item];
                let discountPrice = (minMax.min - parseInt(contentCard.price)/parseInt(contentCard.pay_period))*parseInt(contentCard.pay_period);
                let display = '';
                if (discountPrice<=0){
                    display = 'style="display: none"';
                }
                cardThreeOptions[contentCard.ID] = {
                    title: tariffOptions[el.dataset.card][0].title,
                    month: decMonth(contentCard.pay_period),
                    priceMonth: parseInt(contentCard.price)/parseInt(contentCard.pay_period),
                    price: parseInt(contentCard.price),
                    newPayday: contentCard.new_payday
                };
                section.insertAdjacentHTML('beforeend',
                    '<div class="card">'+
                    '<div id="card_month" class="card__title">'+ decMonth(contentCard.pay_period) +'</div>'+
                    '<div data-card="'+ contentCard.ID +'" class="card__content card__content_mb-2 card__third-page">'+
                    '<div class="card__price">' + parseInt(contentCard.price)/parseInt(contentCard.pay_period) + ' &#8381;/мес</div>'+
                    '<div class="card__options">Разовый платёж &ndash; ' + parseInt(contentCard.price) + ' &#8381;</div>'+
                    '<div class="card__options" '+ display +' >Скидка &ndash; ' + discountPrice + ' &#8381;</div>'+
                    '<div class="card__arrow"><img src="img/arrow.svg" alt=""></div>'+
                    '</div>'+
                    '</div>'
                );
            }

            let butt = document.getElementById('arrow1');
            butt.addEventListener('click', function () {
                document.getElementById('section-two').style.display = "none";
                document.getElementById('section-one').style.display = "flex";
            })
            cardThree = document.querySelectorAll('.card__third-page');

            [].forEach.call(cardThree,function(el){
                el.addEventListener('click', function (e) {
                    document.getElementById('section-two').style.display = "none";
                    let section = document.getElementById('section-three');
                    section.style.display = "flex";
                    let options = cardThreeOptions[el.dataset.card];

                    section.innerHTML =
                        '<div class="card card_two">'+
                        '<div id="arrow2" class="card__top-arrow"><img src="img/arrow-green.svg" alt=""></div>'+
                        '<div class="card__top-title">Выбор тарифа</div>'+
                        '</div>';
                    section.insertAdjacentHTML('beforeend',
                        '<div class="card card_three">'+
                        '<div class="card__title">Тариф "'+ options.title +'"</div>'+
                        '<div class="card__content card__content_mb-2">'+
                        '<div class="card__price">Период оплаты &ndash; ' + options.month + '</br>'+ options.priceMonth +' &#8381;/мес</div>'+
                        '<div class="card__options">разовый платёж &ndash; ' + options.price + ' &#8381;</div>'+
                        '<div class="card__options">со счёта спишется &ndash; ' + options.price + ' &#8381;</div>'+

                        '<div class="card__options card__options_color-2 card__options_mt-2">вступит в силу &ndash; сегодня</div>'+
                        '<div class="card__options card__options_color-2">активно до &ndash; '+ convertDate(options.newPayday) +'</div>'+
                        '</div>'+
                        '<div class="card__footer"><button class="card__button">Выбрать</button></div>'+
                        '</div>'
                    );
                    let butt = document.getElementById('arrow2');
                    butt.addEventListener('click', function () {
                        document.getElementById('section-three').style.display = "none";
                        document.getElementById('section-two').style.display = "flex";
                    })
                })
            });
        })
    });

}, false);
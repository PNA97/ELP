import Swiper from 'swiper/bundle';

document.addEventListener('DOMContentLoaded', () => {

    // Custom JS
    const swiperTest = new Swiper('.s-testimonials_swiper', {
        // Optional parameters
        direction: 'horizontal',
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        slidesPerView: 3,
        slidesPerColumn: 1,
        centeredSlides: true,
        slideToClickedSlide: true,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
            pageUpDown: true,
        },
        mousewheel: {
            sensitivity: 1,
        },
        spaceBetween: 8,
        slideActiveClass: 'active',
        speed: 600,

    });

    const swiperRew = new Swiper('.s-rewards_swiper', {
        direction: 'horizontal',
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        slidesPerView: 1,
        loop: true,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
            pageUpDown: true,
        },
        speed: 600,
    });

    const ratings = document.querySelectorAll('.s-testimonials_rating');

    if (ratings.length > 0) {
        initRatings();
    }
    //Основная функция
    function initRatings() {
        let ratingActive, ratingValue;

        ratings.forEach((el) =>{
            initRating(el);
        });

        //Инициализируем конкретный рейтинг
        function initRating(rating) {
            initRatingVars(rating);
            setRatingActiveWidth();

            if (rating.classList.contains('rating_set')) {
                setRating(rating);
            }
        }

        //Инициализация переменных
        function initRatingVars(rating) {
            ratingActive = rating.querySelector('.s-testimonials_rating-active');
            ratingValue = rating.querySelector('.s-testimonials_rating-value');
        }

        //Изменяем ширину активных звёзд
        function setRatingActiveWidth(index = ratingValue.innerHTML) {
            const ratingActiveWidth = index / 0.05;
            ratingActive.style.width = `${ratingActiveWidth}%`;
        }

        //Возможность указать оценку
        function setRating(rating) {
            const ratingItems = rating.querySelectorAll('.s-testimonials_rating-item');

            for (let index = 0; index < ratingItems.length; index++) {
                const ratingItem = ratingItems[index];


                ratingItem.addEventListener('mouseenter', function () {
                    //Обновление переменных
                    initRatingVars(rating);
                    //Обновление активных звёзд
                    setRatingActiveWidth(ratingItem.value);
                });
                ratingItem.addEventListener('mouseleave', function () {
                    //Обновление активных звёзд
                    setRatingActiveWidth();
                });
                ratingItem.addEventListener('click', () => {
                    //Обновление переменных
                    initRatingVars(rating);

                    if (rating.dataset.ajax) {
                        //Отправить на сервер
                        setRatingValue(ratingItems.value, rating);
                    } else {
                        //Отобразить указанную оценку
                        ratingValue.innerHTML = index + 1;
                        setRatingActiveWidth();
                    }
                });
            }
        }
    }
});

document.addEventListener("DOMContentLoaded",function(){
    let btn = this.getElementById("download");

    if (btn) {
        btn.addEventListener("click",function(){
            let cl = this.classList,
                r = "header_button--running",
                d = "header_button--done",
                dur = 4000;

            if (!cl.contains(r) && !cl.contains(d) && !this.disabled) {
                cl.add(r);
                this.disabled = true;
                this.innerHTML = "Downloading…";

                setTimeout(() => {
                    cl.remove(r);
                    cl.add(d);
                    this.innerHTML = "Done!";

                    setTimeout(() => {
                        cl.remove(d);
                        this.disabled = false;
                        this.innerHTML = "Download";
                    },1500);
                },dur);
            }
        });
    }
});

//preloader
let preloader = document.getElementById("preloader_preload");

function fadeOutnojquery(el) {
    el.style.opacity = 1;
    let interPreloader = setInterval(function () {
        el.style.opacity = el.style.opacity - 0.05;
        if (el.style.opacity <= 0.05) {
            clearInterval(interPreloader);
            preloader.style.display = "none";
        }
    }, 16);
}

window.onload = function () {
    setTimeout(function () {
        fadeOutnojquery(preloader);
    }, 1000);
};
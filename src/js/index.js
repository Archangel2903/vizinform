import '../scss/main.scss';
import 'intersection-observer';
import $ from 'jquery';
import 'jquery-ui';
import 'jquery-ui/ui/effect';
import 'jquery-ui/ui/widgets/tabs';
import 'bootstrap';
import 'popper.js';
import Swiper from 'swiper/dist/js/swiper.min';
import IMask from "imask";
import 'bootstrap-star-rating';

$(window).on('load', function () {
    let b = $('body');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        b.addClass('ios');
    } else {
        b.addClass('web');
    }

    b.removeClass('loaded');
});

$(function () {
    // catalog
    (function () {
        const toggler = document.querySelector('.catalog__toggle');
        const listWrap = document.querySelector('.catalog__list-wrapper');
        const list = document.querySelector('.catalog__list');
        const listItem = listWrap.querySelectorAll('.catalog__list > li');

        listItem.forEach(function (el, i) {
            el.addEventListener('mouseenter', function (e) {
                if (this.querySelector('.catalog__sublist-wrap')) {
                    let sublistHeight = this.querySelector('.catalog__sublist-wrap').offsetHeight;

                    if (sublistHeight > list.offsetHeight) {
                        listWrap.style.height = `${sublistHeight + 20}px`;
                    } else if (sublistHeight < list.offsetHeight) {
                        listWrap.style.height = `auto`;
                    } else {
                        listWrap.style.height = `auto`;
                    }
                }
            });

            el.addEventListener('mouseleave', function () {
                listWrap.style.height = `auto`;
            });
        });

        toggler.addEventListener('click', function (e) {
            let catalogMenu = this.nextElementSibling;

            catalogMenu.classList.toggle('opened');
        });
    })();

    // Cart
    (function () {
        let cartButton = document.querySelector('.cart__ico');
        cartButton.addEventListener('click', function () {
            this.nextElementSibling.classList.toggle('opened');
        });

        let counterBtn = document.querySelectorAll('.cart__counter-btn');
        counterBtn.forEach(function (el, i) {
            // el.addEventListener('click', counter);
            el.addEventListener('mousedown', counter);
        });

        let removeItemBtn = document.querySelectorAll('.cart__item-remove');
        removeItemBtn.forEach(function (el, i) {
            el.addEventListener('click', function () {
                this.parentElement.remove();
            })
        });

        function counter() {
            let field = this.parentElement.querySelector('.cart__counter-field');
            let currentVal = this.parentElement.querySelector('.cart__counter-field').value;

            if (this.classList.contains('cart__counter-btn_minus')) {
                if (currentVal > 1) {
                    this.nextElementSibling.value = +currentVal - 1;
                }
            } else if (this.classList.contains('cart__counter-btn_plus')) {
                if (currentVal < Number(field.getAttribute('max'))) {
                    this.previousElementSibling.value = +currentVal + 1;
                }
            }
        }
    })();

    // Swiper slider
    (function () {
        if ($('.main-categories__slider').length) {
            let categoriesSlide = document.querySelectorAll('.main-categories__slider .swiper-slide').length;

            if (categoriesSlide > 6) {
                let categoriesSlider = new Swiper('.swiper-container', {
                    observer: true,
                    observeParents: true,
                    // loop: true,
                    // autoplay: true,
                    spaceBetween: 30,
                    slidesPerView: 'auto',
                });
            }
        }

        if ($('.review-slider').length) {
            let reviewsSlide = document.querySelectorAll('.review-slider .swiper-slide').length;

            if (reviewsSlide > 4) {
                let reviewsSlider = new Swiper('.review-slider', {
                    observer: true,
                    observeParents: true,
                    loop: true,
                    // autoplay: true,
                    spaceBetween: 30,
                    slidesPerView: 4,
                });
            }
        }

        let video_slider = $('.video-slider');
        if (video_slider.length) {
            let videoSlide = document.querySelectorAll('.video-slider .swiper-slide').length;

            if (videoSlide > 1) {
                let videoSlider = new Swiper('.video-slider', {
                    observer: true,
                    observeParents: true,
                    allowTouchMove: true,
                    autoplay: true,
                    pauseOnMouseEnter: true,
                    autoHeight: true,
                    effect: 'fade',
                    pagination: {
                        el: video_slider.prev('.swiper-pagination'),
                        renderBullet: function (index, className) {
                            let title = document.querySelectorAll('.video-slider .swiper-slide')[index].getAttribute('data-title');
                            return '<span class="' + className + '">' + title + '</span>';
                        },
                        clickable: true,
                    },
                    /*breakpoints: {
                        768: {
                            direction: 'horizontal',
                        },
                    }*/
                });
            }
        }

        if ($('.certificates-slider').length) {
            let slide = document.querySelectorAll('.certificates-slider .swiper-slide').length;

            if (slide > 1) {
                let sliderDocs = new Swiper('.certificates-slider', {
                    observer: true,
                    observeParents: true,
                    autoplay: true,
                    spaceBetween: 30,
                    slidesPerView: 6,
                });
            }
        }

        if ($('.main-video__slider').length) {
            let slide = document.querySelectorAll('.main-video__slider .swiper-slide').length;

            if (slide > 1) {
                let mainVideoSlider = new Swiper('.main-video__slider', {
                    observer: true,
                    observeParents: true,
                    spaceBetween: 30,
                    slidesPerView: 3,
                });
            }
        }

        if ($('.simple-slider').length) {
            let slide = document.querySelectorAll('.swiper-container .swiper-slide').length;

            if (slide > 1) {
                let slider = new Swiper('.swiper-container', {
                    observer: true,
                    observeParents: true,
                    loop: true,
                    autoplay: true,
                    spaceBetween: 25,
                    slidesPerView: 1,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    scrollbar: {
                        el: '.swiper-scrollbar',
                        dynamicBullets: true,
                    },
                });
            }
        }
    })();

    // Tabs
    (function () {
        $('#tabs').tabs();
    })();

    //FAQ
    (function () {
        if ($('.faq__box').length > 0) {
            $('.faq__box-header').on('click', function () {
                $(this).toggleClass('active').next().slideToggle();
            });
        }
    })();

    // inputs mask
    (function () {
        const phoneInputs = document.querySelectorAll('.mask-phone');
        const cardNumber = document.querySelectorAll('.mask-card');
        const cardDate = document.querySelectorAll('.mask-card-date');

        if (phoneInputs.length) {
            phoneInputs.forEach(function (e, i) {
                const phone = IMask(e, {
                    mask: '+{38}(\\000)-000-00-00',
                    lazy: true,
                    placeholderChar: '_',
                });
            });
        }

        if (cardNumber) {
            cardNumber.forEach(function (e, i) {
                const card = IMask(e, {
                    mask: '0000 0000 0000 0000',
                    lazy: true,
                    placeholderChar: 'X',
                });
            });
        }

        if (cardDate) {
            cardDate.forEach(function (e, i) {
                const card = IMask(e, {
                    mask: '00\\/00',
                    lazy: true,
                    placeholderChar: '0',
                });
            });
        }
    })();

    // filter
    (function () {
        let filterItems = $('.filter__item');

        filterItems.on('click', function () {
            $(this).toggleClass('active');
        });

        $('.filter__reset').on('click', function () {
            filterItems.forEach(function (e, i) {
                if ($(e).hasClass('active')) {
                    $(e).removeClass('active');
                }
            });
        });
    })();

    // Star rating
    (function () {
        let ratingOutput = $('.star-rating-output'),
            ratingInput = $('.star-rating');

        if (ratingOutput.length) {
            ratingOutput.rating({
                size: 'xs',
                readonly: true,
                displayOnly: true,
                showClear: false,
                showCaption: false,
                stars: 5,
                emptyStar: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><title></title><g id="icomoon-ignore"></g><path fill="#d8d8d8" d="M461.187 58.538c16.746-48.176 84.878-48.176 101.625 0l88.669 255.093c7.391 21.252 27.22 35.662 49.717 36.12l270.008 5.503c50.996 1.039 72.046 65.837 31.405 96.65l-215.208 163.158c-17.929 13.594-25.503 36.908-18.989 58.447l78.205 258.491c14.766 48.818-40.35 88.867-82.219 59.733l-221.674-154.254c-18.467-12.851-42.983-12.851-61.452 0l-221.677 154.254c-41.865 29.134-96.984-10.915-82.215-59.733l78.204-258.491c6.516-21.539-1.060-44.853-18.989-58.447l-215.208-163.158c-40.643-30.813-19.589-95.61 31.403-96.65l270.009-5.503c22.495-0.458 42.329-14.868 49.716-36.12l88.67-255.093z"></path></svg>`,
                filledStar: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><title></title><g id="icomoon-ignore"></g><path fill="#0047ba"
          d="M461.187 58.538c16.746-48.176 84.878-48.176 101.625 0l88.669 255.093c7.391 21.252 27.22 35.662 49.717 36.12l270.008 5.503c50.996 1.039 72.046 65.837 31.405 96.65l-215.208 163.158c-17.929 13.594-25.503 36.908-18.989 58.447l78.205 258.491c14.766 48.818-40.35 88.867-82.219 59.733l-221.674-154.254c-18.467-12.851-42.983-12.851-61.452 0l-221.677 154.254c-41.865 29.134-96.984-10.915-82.215-59.733l78.204-258.491c6.516-21.539-1.060-44.853-18.989-58.447l-215.208-163.158c-40.643-30.813-19.589-95.61 31.403-96.65l270.009-5.503c22.495-0.458 42.329-14.868 49.716-36.12l88.67-255.093z"></path></svg>`,
            });
        }
        if (ratingInput.length) {
            ratingInput.rating({
                size: 'xs',
                showClear: false,
                showCaption: false,
                stars: 5,
                step: 1,
                emptyStar: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><path d="M512 0l158.215 337.080 353.785 54.054-256 262.38 60.436 370.487-316.436-174.92-316.433 174.92 60.433-370.487-256-262.38 353.783-54.054 158.217-337.080z"></path></svg>`,
                filledStar: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><path d="M512 0l158.215 337.080 353.785 54.054-256 262.38 60.436 370.487-316.436-174.92-316.433 174.92 60.433-370.487-256-262.38 353.783-54.054 158.217-337.080z"></path></svg>`,
            });
        }
    })();

    // input counter
    (function () {
        let counterBtn = document.querySelectorAll('.product-content__counter-button');

        counterBtn.forEach(function (e, i) {
            e.addEventListener('click', function () {
                let input = this.parentElement.querySelector('.product-content__counter');
                let inputValue = +input.value;

                if (this.classList.contains('product-content__counter-button_minus')) {
                    if (inputValue > 0) {
                        input.value = inputValue - 1;
                    }
                }
                else if (this.classList.contains('product-content__counter-button_plus')) {
                    input.value = inputValue + 1;
                }
            });
        });
    })();

    // Lazy load observer
    const imagesAll = document.querySelectorAll('img[data-src]');
    let imgObserve = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.intersectionRatio >= 0 && entry.target.hasAttribute('data-src')) {
                let current = entry.target;
                let source = current.getAttribute('data-src');

                current.setAttribute('src', source);
                current.removeAttribute('data-src');
            }
        });
    });
    if (imagesAll.length > 0) {
        imagesAll.forEach(function (image) {
            imgObserve.observe(image);
        });
    }
});
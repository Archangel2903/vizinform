import '../scss/main.scss';
import 'intersection-observer';
import $ from 'jquery';
import 'jquery-ui';
import 'jquery-ui/ui/effect';
import 'jquery-ui/ui/widgets/tabs';
import 'bootstrap';
import 'popper.js';
import Swiper from 'swiper/dist/js/swiper.min';

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
                    // width: 1058,
                    // height: 585,
                    // loop: false,
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
                let slider = new Swiper('.certificates-slider', {
                    observer: true,
                    observeParents: true,
                    // loop: true,
                    autoplay: true,
                    spaceBetween: 30,
                    slidesPerView: 6,
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
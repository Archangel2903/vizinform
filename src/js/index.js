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
                    }
                    else if (sublistHeight < list.offsetHeight) {
                        listWrap.style.height = `auto`;
                    }
                    else {
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

    // Swiper slider
    (function () {
        if ($('.swiper-container').length) {
            let slider;
            let slide = document.querySelectorAll('.swiper-container .swiper-slide').length;

            if (slide > 1) {
                slider = new Swiper('.swiper-container', {
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
                    /*scrollbar: {
                        el: '.swiper-scrollbar',
                    },*/
                    dynamicBullets: true,
                });
            }
        }
    })();

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
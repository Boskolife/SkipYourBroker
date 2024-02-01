import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

export const swiper = new Swiper('.works_slider', {
  slidesPerView: 1,
  centeredSlides: true,
  modules: [Navigation, Pagination],
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  on: {
    slideChange: function () {
      // const swiper = this as Swiper;
      const slides = document.querySelectorAll('.swiper-slide');
      const step = document.querySelectorAll('.step');
      
      step.forEach((bullet: Element, index: number) => {
        (bullet as HTMLElement).classList.remove('active_step');
      });
      
      // Добавление класса активности к текущему активному слайду и его навигационному элементу
      const activeIndex = swiper.realIndex;
      (slides[activeIndex] as HTMLElement).classList.add('active');
      (step[activeIndex] as HTMLElement).classList.add('active_step');
    },
  },
});

export const swiperReviews = new Swiper('.reviews_swiper', {
  slidesPerView: 2,
  modules: [Navigation, Pagination],
  spaceBetween: 50,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 2,
    },
  },
});

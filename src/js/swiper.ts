import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

export const swiper = new Swiper('.works_slider', {
  slidesPerView: 1,
  centeredSlides:true,
  modules: [Navigation, Pagination],
  navigation: {
    nextEl: '.swiper-button-prev',
    prevEl: '.swiper-button-next',
  },
});

export const swiperReviews = new Swiper('.reviews_swiper', {
  slidesPerView: 1.65,
  modules: [Navigation, Pagination],
  navigation: {
    nextEl: '.swiper-button-prev',
    prevEl: '.swiper-button-next',
  },
  pagination: {
    el: '.swiper-pagination',
  },
});

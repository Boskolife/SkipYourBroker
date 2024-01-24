import { findHref } from './findHref';
import { swiper } from './swiper.ts';
import { burgerMenu } from './burger.ts';
import { initTabs } from './tabs.ts';
import { pagination } from './pagination.ts';

burgerMenu();
findHref();
initTabs();
pagination();
swiper.init();

import { findHref } from './findHref';
import { swiper } from './swiper.ts';
import { burgerMenu } from './burger.ts';
import { initTabs } from './tabs.ts';
burgerMenu();
findHref();
initTabs();
swiper.init();

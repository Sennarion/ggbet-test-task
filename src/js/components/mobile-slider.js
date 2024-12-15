import gsap from 'gsap';
import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';
import { buildSwiper, removeSwiper, exist, BREAKPOINTS } from '../utils';
import 'swiper/css';

const CLASSNAMES = {
	slider: '.js-mobile-slider',
	wrapper: '.js-mobile-slider-wrapper',
	pagination: '.js-mobile-slider-pagination',
	prevBtn: '.js-mobile-slider-prev',
	nextBtn: '.js-mobile-slider-next',
};

const mobileSlider = () => {
	const $sliderWrappers = document.querySelectorAll(CLASSNAMES.wrapper);

	if (!exist($sliderWrappers)) return;

	$sliderWrappers.forEach(($wrapper) => {
		let sliderEl;
		let isInit = false;

		const $slider = $wrapper.querySelector(CLASSNAMES.slider);

		if (!exist($slider)) return;

		const $pagination = $wrapper.querySelector(CLASSNAMES.pagination);
		const $prevBtn = $wrapper.querySelector(CLASSNAMES.prevBtn);
		const $nextBtn = $wrapper.querySelector(CLASSNAMES.nextBtn);

		const init = () => {
			if (isInit) return;

			buildSwiper($slider);

			sliderEl = new Swiper($slider, {
				modules: [Pagination, Navigation],
				speed: 800,
				spaceBetween: 40,
				slidesPerView: 1,
				loop: true,
				pagination: {
					el: $pagination,
					type: 'bullets',
					clickable: true,
				},
				navigation: {
					prevEl: $prevBtn,
					nextEl: $nextBtn,
				},
				on: {
					init: () => {
						isInit = true;
					},
				},
			});
		};

		const destroy = () => {
			if (!isInit) return;

			sliderEl?.destroy();
			removeSwiper($slider);
			isInit = false;
		};

		const mm = gsap.matchMedia();

		mm.add(`(max-width: ${BREAKPOINTS.mediaPoint2 - 1}px)`, () => {
			init();

			return () => {
				destroy();
			};
		});
	});
};

export default mobileSlider;

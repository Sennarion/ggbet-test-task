import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { exist, onWindowResize, getWindowSize, BREAKPOINTS } from '../utils/index';

gsap.registerPlugin(ScrollTrigger);

const parallax = () => {
	const SELECTORS = {
		section: '.js-parallax-section',
		item: '.js-parallax-el',
	};

	const $section = document.querySelector(SELECTORS.section);
	const $items = $section.querySelectorAll(SELECTORS.item);

	if (!exist($section) || !exist($items)) return;

	const mm = gsap.matchMedia();

	mm.add(`(min-width: ${BREAKPOINTS.mediaPoint1}px)`, () => {
		const maxTranslate = 3;

		let { windowHeight, windowWidth } = getWindowSize();

		onWindowResize(() => {
			({ windowHeight, windowWidth } = getWindowSize());
		});

		const handleMouseMove = (e) => {
			const posX = ((e.clientX / windowWidth) * 2 - 1) * maxTranslate;
			const posY = ((e.clientY / windowHeight) * 2 - 1) * maxTranslate;

			gsap.to($items, {
				xPercent: (i) => (i % 2 === 0 ? -1 : 1) * posX,
				yPercent: (i) => (i % 2 === 0 ? -1 : 1) * posY,
				duration: 2,
				ease: 'sine.out',
			});
		};

		const addMouseMoveEvent = () => {
			document.addEventListener('pointermove', handleMouseMove);
		};

		const removeMouseMoveEvent = () => {
			document.removeEventListener('pointermove', handleMouseMove);
		};

		const trigger = ScrollTrigger.create({
			trigger: $section,
			start: 'top bottom',
			end: 'bottom top',
			onEnter: addMouseMoveEvent,
			onLeave: removeMouseMoveEvent,
			onEnterBack: addMouseMoveEvent,
			onLeaveBack: removeMouseMoveEvent,
		});

		return () => {
			trigger.kill();
			document.removeEventListener('pointermove', handleMouseMove);
		};
	});
};

export default parallax;

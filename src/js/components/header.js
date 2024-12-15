import { exist, onWindowResize, getWindowSize, BREAKPOINTS } from '../utils';

const header = () => {
	const SELECTORS = {
		header: '.js-header',
		menuTrigger: '.js-header-menu-trigger',
	};

	const CLASSNAMES = {
		bodyOpenMenuState: 'body--open_menu_state',
	};

	const { body } = document;
	const $header = document.querySelector(SELECTORS.header);
	const $menuTrigger = $header.querySelector(SELECTORS.menuTrigger);

	if (!exist($header) || !exist($menuTrigger)) return;

	let isMenuOpen = false;

	const toggleMenu = () => {
		body.classList.toggle(CLASSNAMES.bodyOpenMenuState);
		isMenuOpen = !isMenuOpen;
	};

	const closeMenu = () => {
		body.classList.remove(CLASSNAMES.bodyOpenMenuState);
		isMenuOpen = false;
	};

	$menuTrigger.addEventListener('click', toggleMenu);

	onWindowResize(() => {
		const { windowWidth } = getWindowSize();

		if (windowWidth >= BREAKPOINTS.mediaPoint1) {
			closeMenu();
		}
	});
};

export default header;

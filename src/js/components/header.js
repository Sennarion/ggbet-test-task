import { exist, onWindowResize, getWindowSize, BREAKPOINTS } from '../utils';

const header = () => {
	const SELECTORS = {
		header: '.js-header',
		menuTrigger: '.js-header-menu-btn',
	};

	const CLASSNAMES = {
		bodyOpenMenuState: 'body--open_menu_state',
	};

	const { body } = document;
	const $header = document.querySelector(SELECTORS.header);
	const $menuTriggers = $header.querySelectorAll(SELECTORS.menuTrigger);

	if (!exist($header) || !exist($menuTriggers)) return;

	let isMenuOpen = false;

	const openMenu = () => {
		body.classList.add(CLASSNAMES.bodyOpenMenuState);
		isMenuOpen = true;
	};

	const closeMenu = () => {
		body.classList.remove(CLASSNAMES.bodyOpenMenuState);
		isMenuOpen = false;
	};

	const handleTriggerClick = (open) => {
		if (!isMenuOpen && open) {
			openMenu();
		} else {
			closeMenu();
		}
	};

	$menuTriggers.forEach(($trigger) => {
		$trigger.addEventListener('click', handleTriggerClick);
	});

	onWindowResize(() => {
		const { windowWidth } = getWindowSize();

		if (windowWidth >= BREAKPOINTS.mediaPoint1) {
			closeMenu();
		}
	});
};

export default header;

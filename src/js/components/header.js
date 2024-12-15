/* eslint-disable consistent-return */
import { exist } from '../utils';

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

	const handleTriggerClick = (open) => {
		if (!isMenuOpen && open) {
			body.classList.add(CLASSNAMES.bodyOpenMenuState);
			isMenuOpen = true;
		} else {
			body.classList.remove(CLASSNAMES.bodyOpenMenuState);
			isMenuOpen = false;
		}
	};

	$menuTriggers.forEach(($trigger) => {
		$trigger.addEventListener('click', handleTriggerClick);
	});
};

export default header;

import AbstractView from './abstract-view.js';
import {MenuItem} from '../const.js';

const createSiteMenuTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn trip-tabs__btn--active" data-menu-type="${MenuItem.POINTS}" href="#">Table</a>
    <a class="trip-tabs__btn" data-menu-type="${MenuItem.STATISTICS}" href="#" disabled>Stats</a>
  </nav>`
);

export default class SiteMenuView extends AbstractView {
  get template() {
    return createSiteMenuTemplate();
  }

  pointsMenuClickHandler = (callback) => {
    this._callback.menuClick = callback;
    this.element.querySelector('[data-menu-type=POINTS]').addEventListener('click', this.#menuClickHandler);
  }

  statisticsMenuClickHandler = (callback) => {
    this._callback.menuClick = callback;
    this.element.querySelector('[data-menu-type=STATISTICS]').addEventListener('click', this.#menuClickHandler);
  }

  disabledMenuItem = (disabledItem) => {
    const item = this.element.querySelector(`[data-menu-type=${disabledItem}]`);
    item.classList.add('trip-tabs__btn--active');
    item.disabled = true;
    item.removeEventListener('click', this.#menuClickHandler);
  }

  includedMenuItem = (includedItem) => {
    const item = this.element.querySelector(`[data-menu-type=${includedItem}]`);
    item.classList.remove('trip-tabs__btn--active');
    item.disabled = false;
    item.addEventListener('click', this.#menuClickHandler);
  }


  #menuClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.menuType);
  }
}

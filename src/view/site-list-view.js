import { createElement } from '../render.js';

const createSiteList = () => ('<ul class="trip-events__list"></ul>');

export default class SiteList {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createSiteList();
  }

  removeElement() {
    this.#element = null;
  }
}

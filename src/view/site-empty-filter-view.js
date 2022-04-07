import { createElement } from '../render.js';

const createEmptyFilterDescription = () => (
  '<p class="trip-events__msg">There are no past events now</p>'
);

export default class EmptyFilterDescription {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createEmptyFilterDescription();
  }

  removeElement() {
    this.#element = null;
  }
}

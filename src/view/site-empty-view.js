import { createElement } from '../render.js';

const createEmptyDescription = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class EmptyDescription {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createEmptyDescription();
  }

  removeElement() {
    this.#element = null;
  }
}

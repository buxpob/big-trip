import AbstractView from './abstract-view.js';

const createEmptyFilterDescription = () => (
  '<p class="trip-events__msg">There are no past events now</p>'
);
export default class EmptyFilterDescription extends AbstractView {
  get template() {
    return createEmptyFilterDescription();
  }
}

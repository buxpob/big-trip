import AbstractView from './abstract-view.js';

const createEmptyDescription = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);
export default class EmptyDescription extends AbstractView {
  get template() {
    return createEmptyDescription();
  }
}

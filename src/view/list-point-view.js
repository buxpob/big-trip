import AbstractView from './abstract-view.js';

const createSiteList = () => ('<ul class="trip-events__list"></ul>');
export default class SiteList extends AbstractView{
  get template() {
    return createSiteList();
  }
}

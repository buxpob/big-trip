import AbstractAbservable from '../utils/abstract-observable.js';
import { FilterType } from '../const.js';

export default class FilterModel extends AbstractAbservable {
  #filter = FilterType.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}

import { render } from '../utils/render.js';
import { RenderPosition } from '../utils/const.js';
import { sortPointTime, sortPointPrice } from '../utils/util.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-point-view.js';
import { updateItem } from '../utils/util.js';
import NoPointView from '../view/empty-view.js';
import PointPresenter from './point-presenter.js';
// import NoPointFilterView from '../view/site-empty-filter-view.js';
// import { createFilter } from '../view/filter.js';

const SortType = {
  DAY: 'sort-day',
  TIME: 'sort-time',
  PRICE: 'sort-price',
};

export default class PointListPresenter {
  #boardContainer = null;

  #sortComponent = new SortView();
  #pointListComponent = new ListView();
  #noPointComponent = new NoPointView();

  #pointContainer = [];
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;
  #sourcedPointContainer = [];

  constructor(boardContainer) {
    this.#boardContainer = boardContainer;
  }

  init = (pointContainer) => {
    this.#pointContainer = [...pointContainer];

    this.#sourcedPointContainer = [...pointContainer];

    this.#renderSort();
    this.#renderPointList();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handlePointChange = (updatedPoint) => {
    this.#pointContainer = updateItem(this.#pointContainer, updatedPoint);
    this.#sourcedPointContainer = updateItem(this.#sourcedPointContainer, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.DAY:
        this.#pointContainer = [...this.#sourcedPointContainer];
        break;
      case SortType.TIME:
        this.#pointContainer.sort(sortPointTime);
        break;
      case SortType.PRICE:
        this.#pointContainer.sort(sortPointPrice);
        break;
      default:
        this.#pointContainer = [...this.#sourcedPointContainer];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointList();
  }

  #renderSort = () => {
    render(this.#boardContainer, this.#sortComponent, RenderPosition.AFTERBEGINE);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderNoPoints = () => {
    render(this.#boardContainer, this.#noPointComponent, RenderPosition.BEFOREEND);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = () => {
    this.#pointContainer.forEach((point) => {this.#renderPoint(point);});
  }

  #renderPointList = () => {
    render(this.#boardContainer, this.#pointListComponent, RenderPosition.BEFOREEND);

    if (this.#pointContainer.length === 0) {
      this.#renderNoPoints();
    }

    this.#renderPoints();
  }

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }
}

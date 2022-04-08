import { renderElement, RenderPosition } from './render.js';
import InfoView from './view/site-trip-info-view.js';
import MenuView from './view/site-menu-view.js';
import FilterView from './view/site-filter-view.js';
import SortView from './view/site-sort-view.js';
import ListView from './view/site-list-view.js';
import EditFormView from './view/site-form-create-view.js';
import ItemPointView from './view/site-item-list-view.js';
import NoPointsView from './view/site-empty-view.js';
import NoPointsFilterView from './view/site-empty-filter-view.js';
import { createPointRoute } from './mock-point-route.js';
import { createFilter } from './view/filter.js';

const COUNT_ADS = 1;

const pointsRoute = Array.from({length: COUNT_ADS}, createPointRoute).sort((a, b) => b.date - a.date);

const siteHeader = document.querySelector('.page-header');
const siteMenuNavigation = siteHeader.querySelector('.trip-controls__navigation');
const siteFilter = siteHeader.querySelector('.trip-controls__filters');
const siteMain = document.querySelector('.page-main');
const sitePoints = siteMain.querySelector('.trip-events');

renderElement(siteMenuNavigation, new InfoView().element, RenderPosition.BEFOREEND);
renderElement(siteMenuNavigation, new MenuView().element, RenderPosition.BEFOREEND);

const filterComponent = new FilterView();
renderElement(siteFilter, filterComponent.element, RenderPosition.BEFOREEND);

const renderPoint = (list, point) => {
  const pointComponent = new ItemPointView(point);
  const pointEditComponent = new EditFormView(point);

  const replacePointToForm = () => {
    list.replaceChild(pointEditComponent.element, pointComponent.element);
  };

  const replaceFormToPoint = () => {
    list.replaceChild(pointComponent.element, pointEditComponent.element);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);

    // pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => replaceFormToPoint());
  });

  pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
  });

  renderElement(list, pointComponent.element, RenderPosition.BEFOREEND);
};

const renderListPoints = (container) => {
  renderElement(container, new SortView().element, RenderPosition.AFTERBEGINE);
  const listPointsComponent = new ListView();
  renderElement(container, listPointsComponent.element, RenderPosition.BEFOREEND);

  if (pointsRoute.length === 0) {
    renderElement(sitePoints, new NoPointsView().element, RenderPosition.BEFOREEND);
  } else {
    for (const point of pointsRoute) {
      renderPoint(listPointsComponent.element, point);
    }
  }

  const noPointsFilter = new NoPointsFilterView();
  renderElement(sitePoints, noPointsFilter.element, RenderPosition.BEFOREEND);

  const listPoints = Array.from(listPointsComponent.element.children);
  createFilter(filterComponent.element, listPoints, pointsRoute, noPointsFilter.element);
};

renderListPoints(sitePoints);

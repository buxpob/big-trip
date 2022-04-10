import { render, RenderPosition, replace } from './render.js';
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

const COUNT_ADS = 5;

const pointsRoute = Array.from({length: COUNT_ADS}, createPointRoute).sort((a, b) => b.date - a.date);

const siteHeader = document.querySelector('.page-header');
const siteMenuNavigation = siteHeader.querySelector('.trip-controls__navigation');
const siteFilter = siteHeader.querySelector('.trip-controls__filters');
const siteMain = document.querySelector('.page-main');
const sitePoints = siteMain.querySelector('.trip-events');

render(siteMenuNavigation, new InfoView(), RenderPosition.BEFOREEND);
render(siteMenuNavigation, new MenuView(), RenderPosition.BEFOREEND);

const filterComponent = new FilterView();
render(siteFilter, filterComponent, RenderPosition.BEFOREEND);

const renderPoint = (list, point) => {
  const pointComponent = new ItemPointView(point);
  const pointEditComponent = new EditFormView(point);

  const replacePointToForm = () => {
    replace(pointEditComponent, pointComponent);
  };

  const replaceFormToPoint = () => {
    replace(pointComponent, pointEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.setEditClickHandler(() => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });
  // pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => replaceFormToPoint());

  pointEditComponent.setFormSubmitHandler(() => {
    replaceFormToPoint();
  });

  render(list, pointComponent, RenderPosition.BEFOREEND);
};

const renderListPoints = (container) => {
  render(container, new SortView(), RenderPosition.AFTERBEGINE);
  const listPointsComponent = new ListView();
  render(container, listPointsComponent, RenderPosition.BEFOREEND);

  if (pointsRoute.length === 0) {
    render(sitePoints, new NoPointsView(), RenderPosition.BEFOREEND);
  } else {
    for (const point of pointsRoute) {
      renderPoint(listPointsComponent.element, point);
    }
  }

  const noPointsFilter = new NoPointsFilterView();
  render(sitePoints, noPointsFilter, RenderPosition.BEFOREEND);

  const listPoints = Array.from(listPointsComponent.element.children);
  createFilter(filterComponent.element, listPoints, pointsRoute, noPointsFilter.element);
};

renderListPoints(sitePoints);

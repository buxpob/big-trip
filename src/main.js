import { render } from './utils/render.js';
import { RenderPosition } from './utils/const.js';
import InfoView from './view/info-view.js';
import MenuView from './view/menu-view.js';
import FilterView from './view/filter-view.js';
// import NoPointsFilterView from './view/site-empty-filter-view.js';
import { createPointRoute } from './utils/mock.js';
// import { createFilter } from './view/filter.js';
import PointListPresenter from './presenter/point-list-presenter.js';

const COUNT_ADS = 5;

const pointsRoute = Array.from({length: COUNT_ADS}, createPointRoute).sort((a, b) => a.date - b.date);

const siteHeader = document.querySelector('.page-header');
const siteMenuNavigation = siteHeader.querySelector('.trip-controls__navigation');
const siteFilter = siteHeader.querySelector('.trip-controls__filters');
const siteMain = document.querySelector('.page-main');
const siteEvents = siteMain.querySelector('.trip-events');

const presenter = new PointListPresenter(siteEvents);

render(siteMenuNavigation, new InfoView(), RenderPosition.BEFOREEND);
render(siteMenuNavigation, new MenuView(), RenderPosition.BEFOREEND);
// const filterComponent = new FilterView();
render(siteFilter, new FilterView(), RenderPosition.BEFOREEND);
presenter.init(pointsRoute);


// const noPointsFilter = new NoPointsFilterView();
// render(sitePoints, noPointsFilter, RenderPosition.BEFOREEND);

// const listPoints = Array.from(listPointsComponent.element.children);
// createFilter(filterComponent.element, listPoints, pointsRoute, noPointsFilter.element);


import { remove, render } from './utils/render.js';
import { RenderPosition, MenuItem } from './const.js';
import InfoView from './view/info-view.js';
import MenuView from './view/menu-view.js';
import PointListPresenter from './presenter/point-list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import StatisticsView from './view/statistics-view.js';
import ApiService from './api-service.js';

const AUTORIZATION = 'Basic ee123jrkvps';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';

const siteHeader = document.querySelector('.page-header');
const siteMenuNavigation = siteHeader.querySelector('.trip-controls__navigation');
const siteFilter = siteHeader.querySelector('.trip-controls__filters');
const siteMain = document.querySelector('.page-main');
const siteEvents = siteMain.querySelector('.trip-events');

const pointsModel = new PointsModel(new ApiService(END_POINT, AUTORIZATION));

const filterModel = new FilterModel();
const siteInfoComponent = new InfoView();
const siteMenuComponent = new MenuView();
const pointListPresenter = new PointListPresenter(siteEvents, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilter, filterModel, pointsModel);

let statisticsComponent = null;

const handleNewPoint = () => {
  document.querySelector('.trip-main__event-add-btn').disabled = false;
};

const addNewPoint = () => {
  document.querySelector('.trip-main__event-add-btn').disabled = true;
  filterPresenter.destroy();
  filterPresenter.init();
  pointListPresenter.destroy();
  pointListPresenter.init();
  pointListPresenter.createPoint(handleNewPoint);
};

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case (MenuItem.POINTS):
      filterPresenter.init();
      pointListPresenter.init();
      remove(statisticsComponent);
      siteMenuComponent.disabledMenuItem(menuItem);
      siteMenuComponent.includedMenuItem(MenuItem.STATISTICS);
      break;
    case (MenuItem.STATISTICS):
      filterPresenter.destroy();
      pointListPresenter.destroy();
      siteMenuComponent.disabledMenuItem(menuItem);
      siteMenuComponent.includedMenuItem(MenuItem.POINTS);
      statisticsComponent = new StatisticsView(pointsModel.points);
      render(siteEvents, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

filterPresenter.init();
pointListPresenter.init();

pointsModel.init().finally(() => {
  render(siteMenuNavigation, siteInfoComponent, RenderPosition.BEFOREEND);
  render(siteMenuNavigation, siteMenuComponent, RenderPosition.BEFOREEND);
  siteMenuComponent.statisticsMenuClickHandler(handleSiteMenuClick);
  document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    addNewPoint();
  });
});



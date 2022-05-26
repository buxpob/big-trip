import dayjs from 'dayjs';
// import he from 'he';
import SmartView from './smart-view.js';
import flatpickr from 'flatpickr';
import { types } from '../const.js';
import {filterOffers} from '../utils/render.js';

const BLANK_POINT = {
  price: 1000,
  dateStart: dayjs().toDate(),
  dateEnd: dayjs().toDate(),
  type: 'bus',
  isFavorite: false,
  offers: [
    {id: 1, title: 'Infotainment system', price: 50},
    {id: 2, title: 'Order meal', price: 100},
    {id: 3, title: 'Choose seats', price: 190}],
  isNewPoint: true,
  destination: {
    name: 'Geneva',
    description: 'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
    pictures: [
      {src: 'http://picsum.photos/300/200?r=0.6406120152062382', description: 'Geneva street market'},
      {src: 'http://picsum.photos/300/200?r=0.07202296743181202', description: 'Geneva biggest supermarket'},
      {src: 'http://picsum.photos/300/200?r=0.5065727921996108', description: 'Geneva street market'},
      {src: 'http://picsum.photos/300/200?r=0.8515010354605477', description: 'Geneva park'},
      {src: 'http://picsum.photos/300/200?r=0.28306381317680573', description: 'Geneva embankment'},
      {src: 'http://picsum.photos/300/200?r=0.4035051062831063', description: 'Geneva parliament building'},
      {src: 'http://picsum.photos/300/200?r=0.9638854262650747', description: 'Geneva kindergarten'}],
  }
};

const createData = (date) => dayjs(date).format('DD/MM/YY hh:mm');

const createCityList = (cities) =>
  cities.map((city) => `<option value="${city}">`).join('');

const createListOffers = (offers, currentOffersId, isDisabled) =>
  offers.map((offer) =>
    `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${offer.id}" type="checkbox" name="event-offer-luggage" ${isDisabled ? 'readonly' : ''} ${currentOffersId.includes(offer.id) ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-luggage-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
        </label></div>`).join('');


const createOfferSection = (offers, currentOffersId, isDisabled) =>
  `${offers && offers.length > 0 ?
    `<section class="event__section  event__section--offers">         
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">      
    ${createListOffers(offers, currentOffersId, isDisabled)}
    </div>
    </section>` : ''}`;

const createTypesTemplate = (currentType, isDisabled) =>
  types.map((type) => `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${currentType === type ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
    <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type}-1">${type}</label>
  </div>`).join('');

const createSiteEditFormTemplate = (point) => {
  const {
    price,
    dateStart,
    dateEnd,
    destination,
    allOffers,
    type,
    isDisabled,
    isSaving,
    isDeleting,
    isNewPoint,
    cities,
    offers,
  } = point;

  const currentOffersId = offers.map((offer) => offer.id);
  // const offersByType = allOffers.filter((offer) => offer.type === type)[0].offers;
  const offerList = createOfferSection(allOffers, currentOffersId, isDisabled);
  const datePointStart = createData(dateStart);
  const datePointEnd = createData(dateEnd);
  const typeList = createTypesTemplate(type);
  const cityList = createCityList(cities.map((city) => city.name));
  const {name, description, pictures } = destination;

  const isSubmitDisabled = (name === '');

  const createButtonTextreset = isDeleting ? 'Deleting...' : 'Delete';
  const createButtonText = isNewPoint ? 'Cancel' : `${createButtonTextreset}`;

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>    
          
              ${typeList}
              
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">

            ${type}

          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" placeholder="Выберите город из списка" value="${name}" list="destination-list-1">
          <datalist id="destination-list-1" ${isDisabled ? 'disabled' : ''}>

            ${cityList}

          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>          
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${datePointStart}" ${isDisabled ? 'disabled' : ''}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${datePointEnd < datePointStart ? datePointStart : datePointEnd}" ${isDisabled ? 'disabled' : ''}>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}" ${isDisabled ? 'disabled' : ''}>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled ? 'disabled' : ''} ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
        <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${createButtonText}</button>
        
        ${!isNewPoint ? `<button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>` : ''}
        
      </header>
        <section class="event__details">                  
            
        ${offerList}                  
        
        ${name !== '' || description !== '' ? `<section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">

            ${pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.destination}"></img>`).join('')}

          </div>
          </div>` : ''}

        </section>
      </section>
    </form>
  </li>`;
};

export default class PointEditView extends SmartView {
  #datepickerStart = null;
  #datepickerEnd = null;

  constructor(offers, destinations, point = BLANK_POINT) {
    super();
    this._offers = offers;
    this._destinations = destinations;
    this._data = PointEditView.parsePointToData(offers, destinations, point);
    this.#setInnerHandlers();
    this.#setDatepicker();
  }

  get template() {
    return createSiteEditFormTemplate(this._data);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
    }
    if (this.#datepickerEnd) {
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }
  }

  reset = (point) => {
    const destinations = this._destinations;
    const offers = this._offers;
    this.updateData(PointEditView.parsePointToData(offers, destinations, point));
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormDeleteHandler(this._callback.deleteClick);
    this.setFormCloseHandler(this._callback.closeClick);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  setFormDeleteHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
  }

  setFormCloseHandler = (callback) => {
    this._callback.closeClick = callback;
    const buttonClose = this.element.querySelector('.event__rollup-btn');
    if (buttonClose) {
      buttonClose.addEventListener('click', this.#closeClickHandler);
    }
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(PointEditView.parseDataToPoint(this._data));
  }

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(PointEditView.parseDataToPoint(this._data));
  }

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeClick(PointEditView.parseDataToPoint(this._data));
  }

  #setDatepicker = () => {
    this.#datepickerStart = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.dateStart,
        minDate: 'today',
        onChange: this.#changeDatePointStart,
      },
    );
    this.#datepickerEnd = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.dateEnd,
        minDate: 'today',
        onChange: this.#changeDatePointEnd,
      },
    );
  }

  #changeDatePointStart = ([userDateStart]) => {
    this.updateData(
      {
        dateStart: userDateStart,
        dateEnd: this._data.dateEnd < userDateStart ? userDateStart : this._data.dateEnd,
      }
    );
  }

  #changeDatePointEnd = ([userDateEnd]) => {
    this.updateData(
      {
        dateStart: this._data.dateStart > userDateEnd ? userDateEnd : this._data.dateStart,
        dateEnd: userDateEnd,
      }
    );
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#changeTypePoint);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeCityPoint);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#changePricePoint);
    if (this.element.querySelector('.event__section--offers')) {
      this.element.querySelector('.event__section--offers').addEventListener('change', this.#chooseOfferPoint);
    }
  }

  #changeTypePoint = (evt) => {
    evt.preventDefault();
    const typePoint = evt.target.value.toLowerCase();
    this.updateData(
      {
        type: typePoint,
        offers: [],
        allOffers: filterOffers(this._offers, typePoint),
      }
    );
  }

  #choiceCity = (currentCity, list) => {
    const city = list.find((item) => item.name === currentCity);
    if (city === undefined || city.name === '') {
      return {
        name: '',
        description: '',
        pictures: [],
      };
    } else if (city.name === currentCity) {
      return {
        name: city.name,
        description: city.description,
        pictures: city.pictures,
      };
    }
  }

  #changeCityPoint = (evt) => {
    evt.preventDefault();
    const cityInfo = this.#choiceCity(evt.target.value, this._destinations);
    this.updateData({
      destination: {
        ...this._data.destination,
        name: cityInfo.name,
        description: cityInfo.description,
        pictures: cityInfo.pictures,
      }
    });
  }

  #changePricePoint = (evt) => {
    evt.preventDefault();
    this.updateData({
      price: Number(evt.target.value),
    });
  }

  #chooseOfferPoint = (evt) => {
    evt.preventDefault();
    const currentOfferId = Number(evt.target.id.split('-').slice(-1).join(''));
    const currentOffer = this._data.allOffers.find((offer) => offer.id === currentOfferId);
    if (evt.target.checked) {
      this.updateData({
        offers: [
          ...this._data.offers,
          currentOffer,
        ],
      });
    } else {
      this.updateData({
        offers: [
          ...this._data.offers.filter((offer) => offer.id !== currentOfferId),
        ],
      });
    }
  }

  static parsePointToData = (offers, destinations, point) => ({...point,
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
    cities: destinations,
    allOffers: filterOffers(offers, point.type),
  });

  static parseDataToPoint = (data) => {
    const point = {...data};

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;
    delete point.isNewPoint;
    delete point.cities;
    delete point.allOffers;

    return point;
  };
}

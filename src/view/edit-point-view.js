import dayjs from 'dayjs';
// import he from 'he';
import SmartView from './smart-view.js';
import { types, cities } from '../const.js';
import flatpickr from 'flatpickr';

const BLANK_POINT = {
  price: 1000,
  dateStart: dayjs().toDate(),
  dateEnd: dayjs().toDate(),
  type: 'bus',
  isFavorite: false,
  offers: [],
  isNewPoint: true,
  destination: {
    name: 'Geneva',
    description: 'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
    pictures: [],
  }
};

const createData = (date) => dayjs(date).format('DD/MM/YY hh mm');

const createCityList = (list) => {
  list.map((city) => `<option value="${city}">`).join('');
};

const cityList = createCityList(cities);

const createListOffers = (offers, isDisabled) =>
  offers.map((offer) => `<div class="event__available-offers">
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${offer.id}" type="checkbox" name="event-offer-luggage" ${isDisabled ? 'readonly' : ''}>
    <label class="event__offer-label" for="event-offer-luggage-1">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`).join(' ');

const createTypesTemplate = (currentType, isDisabled) =>
  types.map((type) => `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${currentType === type ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
  </div>`).join('');

const createSiteEditFormTemplate = (point) => {
  const {
    price,
    dateStart,
    dateEnd,
    destination,
    offers,
    type,
    isDisabled,
    isSaving,
    isDeleting,
    isNewPoint,
  } = point;

  const datePointStart = createData(dateStart);
  const datePointEnd = createData(dateEnd);
  const listOffers = createListOffers(offers);
  const listTypes = createTypesTemplate(type);
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
          
              ${listTypes}
              
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">

            ${type}

          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
          <datalist id="destination-list-1" ${isDisabled ? 'disabled' : ''}>

            ${cityList}

          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${datePointStart}" ${isDisabled ? 'disabled' : ''}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${datePointEnd}" ${isDisabled ? 'disabled' : ''}>
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
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          ${listOffers}

          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">

            ${pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.destination}"></img>`).join('')}

          </div>
          </div>
        </section>
      </section>
    </form>
  </li>`;
};

export default class PointEditView extends SmartView {
  #datepickerStart = null;
  #datepickerEnd = null;

  constructor(point = BLANK_POINT) {
    super();
    this._data = PointEditView.parsePointToData(point);
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
    this.updateData(PointEditView.parsePointToData(point));
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormDeleteHandler(this._callback.deleteClick);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  setFormDeleteHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(PointEditView.parseDataToPoint(this._data));
  }

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(PointEditView.parseDataToPoint(this._data));
  }

  #setDatepicker =() => {
    this.#datepickerStart = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'Y/m/d',
        defaultDate: this._data.dateStart,
        onChange: this.#changeDatePointStart,
      }
    );

    this.#datepickerEnd = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'Y/m/d',
        defaultDate: this._data.dateEnd,
        onChange: this.#changeDatePointEnd,
      }
    );
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#changeTypePoint);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeCityPoint);
  }

  #changeDatePointStart = ([userDateStart]) => {
    this.updateData(
      {
        dateStart: userDateStart,
      }
    );
  }

  #changeDatePointEnd = ([userDateEnd]) => {
    this.updateData(
      {
        dateEnd: userDateEnd,
      }
    );
  }

  #changeTypePoint = (evt) => {
    evt.preventDefault();
    this.updateData(
      {
        type: evt.target.value,
        offers: [],
      }
    );
  }

  #changeCityPoint = (evt) => {
    evt.preventDefault();
    if (evt.target.value === '') {
      this.updateData({
        destination: {
          ...this._data.destination,
          name: evt.target.value,
          descriptions: '',
          photos: [],
        }});
    } else {
      this.updateData({
        destination:
        {...this._data.destination,
          name: evt.target.value,
          descriptions: '',
          photos: [],
        }});
    }
  }

  static parsePointToData = (point) => ({...point,
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
  });

  static parseDataToPoint = (data) => {
    const point = {...data};

    if (point.destination.name === '') {
      point.destination.descriptions = '';
      point.destination.photos = [];
    }

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;
    delete point.isNewPoint;

    return point;
  };
}

import dayjs from 'dayjs';
import SmartView from './smart-view.js';
import { changeType } from '../utils/render.js';
import { createPointListOffers, createListDescriptions, createListPhotos} from '../utils/mock.js';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.css';

const BLANK_POINT = {
  date: dayjs().format('DD/MM/YY'),
  type: 'Flight',
  city: 'Geneva',
  price: null,
  offer: {
    type: null,
    listOffers: null,
  },
  info: {
    descriptions: 'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
    photos: `<img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
              <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
              <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
              <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
              <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">`,
  }
};

const createData = (date) => dayjs(date).format('DD-MM-YY hh mm');

const createListOffers = (offer) =>
  offer.listOffers.map((item) => `<div class="event__available-offers">
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${item.id}" type="checkbox" name="event-offer-luggage" checked>
        <label class="event__offer-label" for="event-offer-luggage-1">
          <span class="event__offer-title">${item.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${item.price}</span>
        </label>
      </div>`).join(' ');

const createSiteEditFormTemplate = (point) => {
  const {price, dateStart, dateEnd, destination, offer, type} = point;

  const datePointStart = createData(dateStart);
  const datePointEnd = createData(dateEnd);
  const listOffers = createListOffers(offer);
  const {city, description, photos } = destination;

  const isSubmitDisabled = (city === '');

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

              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${datePointStart}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${datePointEnd}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled ? 'disabled' : ''} >Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
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
            ${photos.map((values) => `<img class="event__photo" src="${values}" alt="Event photo"></img>`).join('')}
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

    this.#setInnerHandles();
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

  restoreHandles = () => {
    this.#setInnerHandles();
    this.#setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #setDatepicker =() => {
    this.#datepickerStart = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'j F',
        defaultDate: this._data.dateStart,
        onChange: this.#changeDatePointStart,
      }
    );
    this.#datepickerEnd = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'j F',
        defaultDate: this._data.dateEnd,
        onChange: this.#changeDatePointEnd,
      }
    );
  }

  #setInnerHandles = () => {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#changeTypePoint);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeCityPoint);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(PointEditView.parseDataToPoint(this._data));
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
        type: changeType(evt.target.value),
        offer: createPointListOffers(evt.target.value),
      }
    );
  }

  #changeCityPoint = (evt) => {
    evt.preventDefault();
    if (evt.target.value === '') {
      this.updateData(
        {
          city: evt.target.value,
          info: {
            descriptions: '',
            photos: [],
          }
        });
    } else {

      this.updateData(
        {
          city: evt.target.value,
          info: {
            descriptions: createListDescriptions(),
            photos: createListPhotos(),
          }
        }
      );
    }
  }

  static parsePointToData = (point) => ({...point});

  static parseDataToPoint = (data) => {
    const point = {...data};

    if (point.city === '') {
      point.info.descriptions = '';
      point.info.photos = '';
    }

    return point;
  };
}

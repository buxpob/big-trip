/* global _:readonly */

import dayjs from 'dayjs';
import {nanoid} from 'nanoid';

const typeRoute = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const cities = ['Amsterdam', 'Chamonix', 'Geneva', 'London', 'Berlin'];

const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const offersList = [
  'Upgrade to a business class',
  'Choose the radio station',
  'Add luggage',
  'Switch to comfort class',
  'Add meal',
  'Choose seats',
  'Travel by train',
];

const AmountDescriptions = {
  MIN: 1,
  MAX: 5,
};

const AmountPhotos = {
  MIN: 1,
  MAX: 5,
};

const AmountOffers = {
  MIN: 0,
  MAX: 5,
};

const gerRandomDateDay = () => {
  const maxDaysGap = 7;
  return _.random(-maxDaysGap , maxDaysGap);
};

const gerRandomDateHour = () => {
  const maxDaysGap = 12;
  return _.random(0 , maxDaysGap);
};

const gerRandomDateMinute = () => {
  const maxDaysGap = 60;
  return _.random(0 , maxDaysGap);
};

export const getRandomDateStart = () => {
  const day = gerRandomDateDay();
  const hour = gerRandomDateHour();
  const minute = gerRandomDateMinute();
  const date = dayjs().add(day, 'day').add(hour, 'hour').add(minute, 'minute').toDate();
  return date;
};

const getRandomDateEnd = (dayStart) => {
  const day = _.random(0, 1);
  const hour = gerRandomDateHour();
  const minute = gerRandomDateMinute();
  const date = dayjs(dayStart).add(day, 'day').add(day, 'day').add(hour, 'minute').add(minute, 'hour').toDate();
  return date;
};

const getRandomTypeRoute = () => typeRoute[_.random(0, typeRoute.length - 1)];

const getRandomCity = () => cities[_.random(0, cities.length - 1)];

export const createListDescriptions = () => {
  const countDescriptions = _.random(AmountDescriptions.MIN, AmountDescriptions.MAX);

  const listDescriptions = descriptions.sort(() => Math.random() - 0.5).slice(0, countDescriptions);
  return listDescriptions;
};

export const createPointListOffers = (el) => {
  const offer = {
    'type': el,
    'listOffers': [],
  };

  const countOffers = _.random(AmountOffers.MIN, AmountOffers.MAX);
  for (let i = 0; i < countOffers; i++) {
    const itemOffer = {
      'id': i,
      'title': offersList[_.random(0, offersList.length - 1)],
      'price': _.random(100, 999),
    };
    offer.listOffers.push(itemOffer);
  }
  return offer;
};

export const createListPhotos = () => {
  const listPhoto = [];
  const countPhotos = _.random(AmountPhotos.MIN, AmountPhotos.MAX);
  for (let i = 0; i < countPhotos; i++) {
    const addressPhoto = `http://picsum.photos/248/152?r=${_.random(1, 10)}`;
    listPhoto.push(addressPhoto);
  }
  return listPhoto;
};


const createPrice = (arr) => {
  let totalPrice = 0;
  arr.listOffers.map((item) => {
    totalPrice += item.price;
  });

  return totalPrice;
};


export const createPointRoute = () => {
  const typePoint = getRandomTypeRoute();
  const offers = createPointListOffers(typePoint);
  const dayStart = getRandomDateStart();

  return {
    id: nanoid(),
    price: createPrice(offers),
    dateStart: dayStart,
    dateEnd: getRandomDateEnd(dayStart),
    destination: {
      descriptions: createListDescriptions(),
      name: getRandomCity(),
      photos: createListPhotos(),
    },
    isFavorite: true,
    offer: offers,
    type: typePoint,
  };
};

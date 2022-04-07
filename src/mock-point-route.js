/* global _:readonly */

import dayjs from 'dayjs';

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

const getRandomDate = () => {
  const maxDaysGap = 7;
  const daysGap = _.random(-maxDaysGap , maxDaysGap);

  const date = dayjs().add(daysGap, 'day').toDate();
  return date;
};

const getRandomTypeRoute = () => typeRoute[_.random(0, typeRoute.length - 1)];

const getRandomCity = () => cities[_.random(0, cities.length - 1)];

const createListDescriptions = () => {
  const countDescriptions = _.random(AmountDescriptions.MIN, AmountDescriptions.MAX);

  const listDescriptions = descriptions.sort(() => Math.random() - 0.5).slice(0, countDescriptions);
  return listDescriptions;
};

const createListOffers = (el) => {
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

const createListPhotos = () => {
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
  const offers = createListOffers(typePoint);

  return {
    date: getRandomDate(),
    type: typePoint,
    city: getRandomCity(),
    offer: offers,
    price: createPrice(offers),
    info: {
      descriptions: createListDescriptions(),
      photos: createListPhotos(),
    }
  };
};

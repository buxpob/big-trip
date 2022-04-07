import dayjs from 'dayjs';

const isExpired = (date) => dayjs().isAfter(date, 'day');

const createFilterEverything = (listPoints, listItems) => {
  for (let i = 0; i < listItems.length; i++) {
    listPoints[i].classList.remove('visually-hidden');
  }
};

const filterPoints = (condition, listPoints, listItems) => {
  for (let i = 0; i < listItems.length; i++) {
    if (!isExpired(listItems[i].date) === condition) {
      listPoints[i].classList.remove('visually-hidden');
    } else {
      listPoints[i].classList.add('visually-hidden');
    }
  }
};

const createFilterFuture = (listPoints, listItems) => {
  filterPoints(true, listPoints, listItems);
};

const createFilterPast = (listPoints, listItems) => {
  filterPoints(false, listPoints, listItems);
};

const checkEmptyPoints = (listPoints, listItems, description) => {
  for (let i = 0; i < listItems.length; i++) {
    if (listPoints[i].classList.contains('visually-hidden')) {
      description.classList.remove('visually-hidden');
    } else {
      description.classList.add('visually-hidden');
    }
  }
};

export const createFilter = (form, listPoints, listItems, description) => {
  description.classList.add('visually-hidden');
  form.addEventListener('change', (evt) => {
    if (evt.target.value === 'everything') {
      createFilterEverything(listPoints, listItems);
      description.classList.add('visually-hidden');
    }

    if (evt.target.value === 'future') {
      createFilterFuture(listPoints, listItems);
      checkEmptyPoints(listPoints, listItems, description);
    }

    if (evt.target.value === 'past') {
      createFilterPast(listPoints, listItems);
      checkEmptyPoints(listPoints, listItems, description);
    }
  });
};

import AbstractView from '../view/abstract-view.js';
import { ListType, RenderPosition } from './const.js';

export const render = (container, element, place) => {
  const parent = container instanceof AbstractView ? container.element : container;
  const child = element instanceof AbstractView ? element.element : element;

  switch (place) {
    case RenderPosition.BEFOREBEGIN:
      parent.before(child);
      break;
    case RenderPosition.AFTERBEGINE:
      parent.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      parent.append(child);
      break;
    case RenderPosition.AFTEREND:
      parent.after(child);
      break;
  }
};

export const createElement = (template) => {
  const element = document.createElement('div');
  element.innerHTML = template;

  return element.firstChild;
};

export const replace = (newElement, oldElement) => {
  if (newElement === null || oldElement === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  const newChild = newElement instanceof AbstractView ? newElement.element : newElement;
  const oldChild = oldElement instanceof AbstractView ? oldElement.element : oldElement;

  const parent = oldChild.parentElement;

  if (parent === null) {
    throw new Error('Parent element doesn\'t exist');
  }

  parent.replaceChild(newChild, oldChild);
};

export const remove = (component) => {
  if (component === null) {
    throw new Error('Can remove only components');
  }

  component.element.remove();
  component.removeElement();
};

export const changeType = (type) => {
  switch (type) {
    case ListType.TAXI:
      return 'Taxi';
    case ListType.BUS:
      return 'Bus';
    case ListType.TRAIN:
      return 'Train';
    case ListType.SHIP:
      return 'Ship';
    case ListType.DRIVE:
      return 'Drive';
    case ListType.FLIGHT:
      return 'Flight';
    case ListType.CHECKIN:
      return 'Check-in';
    case ListType.SIGHTSEEING:
      return 'Sightseeing';
    case ListType.RESTAURANT:
      return 'Restaurant';
  }
};

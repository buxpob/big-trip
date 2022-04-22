import dayjs from 'dayjs';
import { renderDay, renderHour, renderMinute} from '../utils/render.js';

const typeList = {
  'TAXI': 0,
  'BUS': 0,
  'TRAIN': 0,
  'SHIP': 0,
  'FLIGHT': 0,
  'DRIVE': 0,
  'CHECK-IN': 0,
  'SIGHTSEEING': 0,
  'RESTAURANT': 0,
};

const sumPointProperty = (point, property, list) => {
  switch (point.type) {
    case ('taxi'):
      list['TAXI'] += property;
      break;
    case ('bus'):
      list['BUS'] += property;
      break;
    case ('train'):
      list['TRAIN'] += property;
      break;
    case ('ship'):
      list['SHIP'] += property;
      break;
    case ('flight'):
      list['FLIGHT'] += property;
      break;
    case ('drive'):
      list['DRIVE'] += property;
      break;
    case ('check-in'):
      list['CHECK-IN'] += property;
      break;
    case ('sightseeing'):
      list['SIGHTSEEING'] += property;
      break;
    case ('restaurant'):
      list['RESTAURANT'] += property;
      break;
  }
};

export const createListPricePoint = (points) => {
  const listForPrice = Object.assign({}, typeList);

  points.map((point) => {
    sumPointProperty(point, point.price, listForPrice);
  });

  return listForPrice;
};

export const createListTypePoint = (points) => {
  const listForType = Object.assign({}, typeList);

  points.map((point) => {
    sumPointProperty(point, 1, listForType);
  });

  return listForType;
};

export const createListTimePoint = (points) => {
  const listForType = Object.assign({}, typeList);

  points.map((point) => {
    const diffTime = dayjs(point.dateEnd).diff(dayjs(point.dateStart), 'm');
    sumPointProperty(point, diffTime, listForType);
  });

  return listForType;
};

export const createTypeTime = (type) => {
  const timeDay = Math.floor(type/(60*24));
  const timeHoure = type%24;
  const timeMinute = type%60;

  return `${renderDay(timeDay)} ${renderHour(timeHoure)} ${renderMinute(timeMinute)}`;
};

export const listKeySort = (list) => Object.keys(list).sort((a, b) => list[b] - list[a]);

export const listValueSort = (list) => Object.values(list).sort((a, b) => b - a);

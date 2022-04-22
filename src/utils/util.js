import dayjs from 'dayjs';
import { renderTime } from '../utils/render.js';

export const sortPointDay = (a, b) => a.dateStart - b.dateStart;

export const sortPointPrice = (a, b) => a.price - b.price;

export const sortPointTime = (a, b) => renderTime(a) - renderTime(b);

export const isDatesEqual = (a, b) => dayjs(a).isSame(b, 'D');

export const isPricesEqual = (a, b) => a.price === b.price;

export const isTimeEqual = (a, b) => renderTime(a) === renderTime(b);

export const correctInputCityName = (cityList, cityName) => cityList.some((city) => city === cityName);

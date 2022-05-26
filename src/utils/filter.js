import dayjs from 'dayjs';
import { FilterType } from '../const.js';

const isExpiredAfter = (date) => dayjs().isAfter(date.dateStart, 'day');
const isExpiredBefore = (date) => dayjs().isBefore(date.dateStart, 'day');
const isToday = (date) => dayjs().isSame(date, 'D');

export const filter = (points, filterType) => {
  switch (filterType) {
    case FilterType.EVERYTHING:
      return points.filter((point) => point);
    case FilterType.FUTURE:
      return points.filter((point) => !isExpiredAfter(point));
    case FilterType.PAST:
      return points.filter((point) => !isExpiredBefore(point) && !isToday(point.dateStart));
  }
};

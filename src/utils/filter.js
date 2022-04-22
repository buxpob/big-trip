import dayjs from 'dayjs';
import { FilterType } from '../const.js';

const isExpiredAfter = (date) => dayjs().isAfter(date.dateStart, 'day');
const isExpiredBefore = (date) => dayjs().isBefore(date.dateStart, 'day');

// export const filter = {
//   [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
//   [FilterType.FUTURE]: (points) => points.filter((point) => isExpired(point.dateStart)),
//   [FilterType.PAST]: (points) => points.filter((point) => !isExpired(point.dateStart)),
// };

export const filter = (points, filterType) => {
  switch (filterType) {
    case FilterType.EVERYTHING:
      return points.filter((point) => point);
    case FilterType.FUTURE:
      return points.filter((point) => !isExpiredAfter(point));
    case FilterType.PAST:
      return points.filter((point) => !isExpiredBefore(point));
  }
};

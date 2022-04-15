export const updateItem = (items, updated) => {
  const index = items.findIndex((item) => item.id === updated.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    updated,
    ...items.slice(index + 1),
  ];
};

export const sortPointTime = (a, b) => b.time - a.time;

export const sortPointPrice = (a, b) => b.price - a.price;

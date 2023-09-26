export function countCartItems(items) {
  return items.reduce((count, item) => item.quantity + count, 0);
}

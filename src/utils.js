export function countCartItems(items) {
  return items.reduce((count, item) => item.quantity + count, 0);
}

export function calculateTotal(items) {
  return items.reduce(
    (sum, item) => item.quantity * item.product.price + sum,
    0
  );
}

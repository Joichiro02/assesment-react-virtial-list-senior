export default function computeDiscount(
  price: number,
  discountPercentage: number
) {
  const discount = discountPercentage / 100;
  const discountPrice = price * discount;

  return Math.ceil(price - discountPrice);
}

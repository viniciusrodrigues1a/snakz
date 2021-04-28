import formatPrice from "./formatPrice";

export async function fetchProducts() {
  const response = await fetch("/products").then(res => res.json());
  const formattedResponse = response.map(p => {
    const amount = 1;
    const formattedDiscountPrice = getFormattedDiscountPrice(p);
    return {
      ...p.product,
      discountId: p.discount?.id,
      amount,
      formattedDiscountPrice,
      formattedPrice: formatPrice(p.product.price),
      formattedSubtotal: formatPrice(p.product.price * amount),
    };
  });
  return formattedResponse;
}

export async function fetchProduct(id) {
  const response = await fetch(`/products/${id}`).then(res => res.json());
  const formattedResponse = {
    ...response.product,
    formattedPrice: formatPrice(response.price),
  };
  return formattedResponse;
}

function getFormattedDiscountPrice(p) {
  if (p.discount) {
    return formatPrice(p.product.price - p.discount.amount);
  }

  return null;
}

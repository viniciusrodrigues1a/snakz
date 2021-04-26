import formatPrice from "./formatPrice";

export async function fetchProducts() {
  const response = await fetch("/products").then(res => res.json());
  const formattedResponse = response.map(p => {
    const amount = 1;
    return {
      ...p.product,
      amount,
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

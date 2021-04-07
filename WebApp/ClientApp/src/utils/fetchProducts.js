import formatPrice from "./formatPrice";

export async function fetchProducts() {
  const response = await fetch("/products").then(res => res.json());
  const formattedResponse = response.map(p => {
    const amount = 1;
    return {
      ...p,
      amount,
      formattedPrice: formatPrice(p.price),
      formattedSubtotal: formatPrice(p.price * amount),
    };
  });
  return formattedResponse;
}

export async function fetchProduct(id) {
  const response = await fetch(`/products/${id}`).then(res => res.json());
  const formattedResponse = {
    ...response,
    formattedPrice: formatPrice(response.price),
  };
  return formattedResponse;
}

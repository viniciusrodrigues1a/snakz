import formatPrice from "./formatPrice";

async function fetchProducts() {
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

export default fetchProducts;

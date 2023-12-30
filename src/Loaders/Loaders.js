import { getShoppingCart } from '../../utilities/fakedb';

const reviewLoader = async () => {
  const addedProducts = getShoppingCart();

  const ids = Object.keys(addedProducts);

  const productsData = await fetch('http://localhost:5000/productsIds', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(ids),
  });
  const products = await productsData.json();
  const saveProduct = [];
  for (const id in addedProducts) {
    const product = products.find(pd => pd._id == id);
    if (product) {
      const quantity = addedProducts[id];
      product.quantity = quantity;
      saveProduct.push(product);
    }
  }
  return saveProduct;
};

export default reviewLoader;

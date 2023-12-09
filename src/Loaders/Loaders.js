import { getShoppingCart } from '../../utilities/fakedb';

const reviewLoader = async () => {
  const productsData = await fetch('products.json');
  const products = await productsData.json();
  const addedProducts = getShoppingCart();
  const saveProduct = [];
  for (const id in addedProducts) {
    const product = products.find(pd => pd.id == id);
    if (product) {
      const quantity = addedProducts[id];
      product.quantity = quantity;
      saveProduct.push(product);
    }
  }
  return saveProduct;
};

export default reviewLoader;

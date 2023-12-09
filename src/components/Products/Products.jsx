import React, { useEffect, useState } from 'react';
import './Products.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from '../../../utilities/fakedb';

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('products.json')
      .then(res => res.json())
      .then(products => setProducts(products));
  }, []);

  // state for cart
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const localData = getShoppingCart();
    const newCart = [];
    for (const id in localData) {
      const addedProduct = products.find(product => product.id == id);
      if (addedProduct) {
        const quantity = localData[id];
        addedProduct.quantity = quantity;
        newCart.push(addedProduct);
      }
    }
    setCart(newCart);
  }, [products]);

  // handlere for add to cart

  const handleAddToCart = products => {
    // const newCart = [...cart, products];
    let newCart = [];
    const copyProduct = { ...products };

    const exists = cart.find(pd => pd.id === copyProduct.id);
    const exist = { ...exists };
    if (!exists) {
      copyProduct.quantity = 1;
      newCart = [...cart, copyProduct];
      console.log('hello');
    } else {
      exist.quantity = exist.quantity + 1;
      const rest = cart.filter(pd => pd.id !== copyProduct.id);
      newCart = [...rest, exist];
    }

    setCart(newCart);
    addToDb(copyProduct.id);
  };

  // handler for clear cart
  const handlerClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <div className="product-container">
      <div className="card-container">
        {products &&
          products.map(product => (
            <Product
              key={product.id}
              {...product}
              handleAddToCart={handleAddToCart}
            ></Product>
          ))}
      </div>
      <div className="summary-container">
        <Cart cart={cart} handlerClearCart={handlerClearCart}>
          <Link to="review">
            <button className="checkoutBtn">
              Review Order <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Products;

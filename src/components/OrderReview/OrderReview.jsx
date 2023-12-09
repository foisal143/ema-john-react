import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Cart from '../Cart/Cart';
import './OrderReview.css';
import ReviewCart from '../ReviewCart/ReviewCart';
import { removeFromDb } from '../../../utilities/fakedb';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
const OrderReview = () => {
  const carts = useLoaderData();
  const [cart, setCarts] = useState(carts);

  const handlerRemoveitem = id => {
    const restCart = cart.filter(cart => cart.id !== id);
    setCarts(restCart);
    removeFromDb(id);
  };

  return (
    <div className="review-container">
      <div>
        {cart.map(product => (
          <ReviewCart
            key={product.id}
            product={product}
            handlerRemoveitem={handlerRemoveitem}
          ></ReviewCart>
        ))}
      </div>
      <div className="summary-container">
        <Cart cart={cart}>
          <Link to="/orders">
            <button className="checkoutBtn">
              Checkout <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default OrderReview;

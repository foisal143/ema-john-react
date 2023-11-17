import React from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
const Cart = ({ cart, handlerClearCart }) => {
  let total = 0;
  let totalShiping = 0;
  let quantity = 0;
  console.log(cart);
  for (let product of cart) {
    console.log(product);
    total = total + product.price * parseInt(product.quantity);
    totalShiping = totalShiping + product.shipping;
    quantity = quantity + product.quantity;
  }
  const tax = (total * 5) / 100;
  const grandTotal = total + totalShiping + tax;
  return (
    <div>
      <div className="summary">
        <h2>Order Summary</h2>
        <p>Selected Items: {quantity}</p>
        <p>
          Total price:$
          {total}
        </p>
        <p>Total Shiping charge: ${totalShiping}</p>
        <p>Tax: ${tax.toFixed(2)}</p>
        <h4>Grand Total: $ {grandTotal.toFixed(2)}</h4>
        <button onClick={handlerClearCart} className="clearCartBtn">
          Clear Cart <FontAwesomeIcon icon={faDeleteLeft} />
        </button>
        <button className="checkoutBtn">
          Checkout <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default Cart;

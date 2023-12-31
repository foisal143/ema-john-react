import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
const Cart = ({ cart, handlerClearCart, children }) => {
  let total = 0;
  let totalShiping = 0;
  let quantity = 0;

  for (let product of cart) {
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
        {children}
      </div>
    </div>
  );
};

export default Cart;

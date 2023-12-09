import React from 'react';
import './ReviewCart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const ReviewCart = ({ product, handlerRemoveitem }) => {
  console.log(product);
  const { id, price, quantity, name, img } = product;
  return (
    <div className="reviewCart">
      <img src={img} alt="" />
      <div className="reviewDetails">
        <div className="reDetails">
          <h5>{name}</h5>
          <p>
            Price: <span>${price}</span>
          </p>
          <p>
            Quantity: <span>{quantity}</span>
          </p>
        </div>
        <button onClick={() => handlerRemoveitem(id)}>
          <FontAwesomeIcon icon={faTrash} />{' '}
        </button>
      </div>
    </div>
  );
};

export default ReviewCart;

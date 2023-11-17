import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
const Product = props => {
  const { name, seller, ratings, img, price, handleAddToCart } = props;
  return (
    <div className="card">
      <img src={img} alt="" />
      <div className="card-details">
        <h6>{name}</h6>
        <p>Price: ${price}</p>
        <p>Manufacturer: {seller}</p>
        <p>Ratings: {ratings} stars</p>
      </div>
      <button onClick={() => handleAddToCart(props)} className="btn-cart">
        Add To Cart <FontAwesomeIcon icon={faCartShopping} />
      </button>
    </div>
  );
};

export default Product;

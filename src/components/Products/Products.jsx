import { useEffect, useState } from 'react';
import './Products.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useLoaderData } from 'react-router-dom';
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from '../../../utilities/fakedb';

const Products = () => {
  const [products, setProducts] = useState([]);
  const { totalProduct } = useLoaderData();
  const [perPageCount, setPerPageCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(totalProduct / perPageCount);
  const pageNumbers = [...Array(totalPages).keys()];

  useEffect(() => {
    fetch(
      `http://localhost:5000/products?page=${currentPage}&&limit=${perPageCount} `
    )
      .then(res => res.json())
      .then(products => setProducts(products));
  }, [perPageCount, currentPage]);

  // state for cart
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const localData = getShoppingCart();
    const ids = Object.keys(localData);
    fetch('http://localhost:5000/productsIds', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(ids),
    })
      .then(res => res.json())
      .then(data => {
        const newCart = [];
        for (const id in localData) {
          const addedProduct = data.find(product => product._id == id);
          if (addedProduct) {
            const quantity = localData[id];
            addedProduct.quantity = quantity;
            newCart.push(addedProduct);
          }
        }
        setCart(newCart);
      });
  }, []);

  // handlere for add to cart

  const handleAddToCart = products => {
    let newCart = [];
    const copyProduct = { ...products };

    const exists = cart.find(pd => pd._id === copyProduct._id);
    const exist = { ...exists };
    if (!exists) {
      copyProduct.quantity = 1;
      newCart = [...cart, copyProduct];
      console.log('hello');
    } else {
      exist.quantity = exist.quantity + 1;
      const rest = cart.filter(pd => pd._id !== copyProduct._id);
      newCart = [...rest, exist];
    }

    setCart(newCart);
    addToDb(copyProduct._id);
  };

  // handler for clear cart
  const handlerClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  // handler dropdown page change
  const options = [10, 5, 20];
  const handlerSetPage = e => {
    setPerPageCount(e.target.value);
  };
  return (
    <>
      {' '}
      <div className="product-container">
        <div className="card-container">
          {products &&
            products.map(product => (
              <Product
                key={product._id}
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
      <div className="text-center">
        <p>Current page: {currentPage}</p>
        <div className="pagination">
          {pageNumbers.map(page => (
            <button
              className={currentPage === page ? 'slected' : ''}
              onClick={() => setCurrentPage(page)}
              key={page}
            >
              {page}
            </button>
          ))}
          <select name="page" onChange={handlerSetPage} id="">
            {options.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default Products;

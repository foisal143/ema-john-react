import React, { useContext } from 'react';
import logo from '../images/Logo.svg';
import './Header.css';
import { Link } from 'react-router-dom';
import { ContextUser } from '../../UserContext/UserContext';
const Header = () => {
  const { user, logOut } = useContext(ContextUser);
  const signOutHandler = () => {
    logOut()
      .then(() => {})
      .catch(er => console.log(er.message));
  };
  return (
    <nav className="navbar">
      <img src={logo} alt="" />
      <div className="nav-list">
        <Link to="/">Shop</Link>
        <Link to="/review">Order Review</Link>
        <Link to="/inventory">Manage Inventory</Link>
        <Link to="/login">Login</Link>
      </div>
      {user && (
        <div className="logOutParent">
          <p>{user.email}</p>
          <button className="logout" onClick={signOutHandler}>
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;

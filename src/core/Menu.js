/* eslint-disable linebreak-style */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
import { itemTotal } from './cartHelpers';
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#D3BDA6' };
  }
  return { color: '#62686D' };
};
const Menu = ({ history, className }) => (
  <div className="menu">
    <span>
     <strong> Giovanni Fashion</strong>
    </span>
    <ul className={`nav nav-tabs ${className}`}>
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, '/shop')} to="/shop">Store</Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(history, '/cart')}
          to="/cart"
        >
          <AiOutlineShoppingCart />
          {' '}
          <sup>
            <small className="cart-badge">{ itemTotal() }</small>
          </sup>
        </Link>
      </li>
      {
               isAuthenticated() && isAuthenticated().user.role === 0 && (
               <li className="nav-item">
                 <Link
                   className="nav-link"
                   style={isActive(history, '/user/dashboard')}
                   to="/user/dashboard"
                 >
                   Dashboard
                 </Link>
               </li>
               )
           }

      {
               isAuthenticated() && isAuthenticated().user.role === 1 && (
               <li className="nav-item">
                 <Link
                   className="nav-link"
                   style={isActive(history, '/admin/dashboard')}
                   to="/admin/dashboard"
                 >
                   Dashboard
                 </Link>
               </li>
               )
           }
      {
               !isAuthenticated()
                && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Log In</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">Register</Link>
                  </li>
                </>
                )
           }

      {
               isAuthenticated()
                && (
                !className && (
                  <li className="nav-item">
                  <span
                    className="nav-link"
                    style={{ cursor: 'pointer', color: '#62686D' }}
                    onClick={() => signout(() => {
                      history.push('/');
                    })}
                  >
                  <FaUserCircle />&nbsp;
                    Logout
                  </span>
                </li>
                )
                )
           }

    </ul>
  </div>
);

export default withRouter(Menu);

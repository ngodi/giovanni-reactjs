/* eslint-disable arrow-body-style */
/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import ShowImage from './ShowImage';
import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({
  product,
  showViewProductButton,
  showAddToCartButton,
  cartUpdate,
  showRemoveProductButton,
  setRun = f => f,
  run = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = showViewProductButton => (
    showViewProductButton
           && (
           <Link to={`/product/${product._id}`} className="mr-2">
             <button type="submit" className="btn btn-outline-primary mt-2 mb-2 mr-2">
               View Product
             </button>
           </Link>
           )
  );
  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };
  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
    return '';
  };
  const showAddToCart = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button onClick={addToCart} type="submit" className="btn btn-outline-warning mt-2 mb-2">
          Add to cart
        </button>
      )
    );
  };
  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run);
          }}
          type="submit"
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };
  const showStock = quantity => (quantity > 0
    ? (<span className="badge badge-primary badge-pill">In Stock</span>)
    : (<span className="badge badge-primary badge-pill">Out of Stock</span>));

  const handleChange = productId => event => {
    setRun(!run);
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };
  const showCartUpdateOptions = cartUpdate => {
    return cartUpdate && (
    <div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Adjust Quantity</span>
        </div>
        <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
      </div>
    </div>
    );
  };
  return (
    <div className="card">
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />
        <div className="name">{product.name}</div>
        <p>
          $
          { product.price }
        </p>
        { showStock(product.quantity) }
        <br />
        { showViewButton(showViewProductButton) }
        { showAddToCart(showAddToCartButton) }
        { showRemoveButton(showRemoveProductButton) }
        { showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

Card.defaultProps = {
  showViewProductButton: true,
  showAddToCartButton: true,
  cartUpdate: false,
  showRemoveProductButton: false,
};
Card.propTypes = {
  product: PropTypes.object.isRequired,
  showViewProductButton: PropTypes.bool,
  showAddToCartButton: PropTypes.bool,
  cartUpdate: PropTypes.bool,
  showRemoveProductButton: PropTypes.bool,

};
export default Card;

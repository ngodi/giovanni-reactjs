/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable prefer-destructuring */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';

const Product = props => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState({});

  const loadSingleProduct = productId => {
    read(productId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        listRelated(data._id)
          .then(data => {
            if (data.error) {
              setError(data.error);
            } else {
              setRelatedProduct(data);
            }
          });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout
      title={product && product.name}
      description={product && product.description && product.description.substring(0, 10)}
      className="container-fluid"
    >
      <h2 className="mb-4">Single Product</h2>
      <div className="row">
        <div className="col-8 mb-3">
          { product && product.description
         && <Card product={product} showViewProductButton={false} />}
        </div>
        <div className="col-4">
          <h4>Related products</h4>
          {
            relatedProduct.map((p, i) => (
              <Card key={i} product={p} />
            ))
          }
        </div>

      </div>
    </Layout>
  );
};

Product.propTypes = {
  match: PropTypes.func.isRequired,

};
export default Product;

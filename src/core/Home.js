/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import React, { useState, useEffect } from 'react';
import BackgroundSlider from 'react-background-slider';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts('sold').then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts('createdAt').then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout className="container-fluid">
      <div className="banner">
         <div className="banner__actions">
            <p>New Outerwear Collection</p>
            <Link to="/shop">
               <button>Shop Now</button>
            </Link> 
         </div>
         <BackgroundSlider
                images={["https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260", "https://images.pexels.com/photos/2772535/pexels-photo-2772535.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"]}
                duration={5} transition={2}
             />
      </div>
    
      <Search />
      <div className="products__display">
        <h2 className="mb-4">New Arrivals</h2>
        <div className="row">
          {
                          productsByArrival.map((product, i) => (
                            <div key={i} className="col-4 mb-3">
                              <Card product={product} />
                            </div>
                          ))
                      }
        </div>
        <h2 className="mb-4">Best Sellers</h2>
        <div className="row">
          {
                          productsBySell.map((product, i) => (
                            <div key={i} className="col-4 mb-3">
                              <Card product={product} />
                            </div>
                          ))
                      }
        </div>
      </div>
    </Layout>
  );
};

export default Home;

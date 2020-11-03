import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { getPurchaseHistory } from './apiUser';

const Dashboard = () => {
  const [history, setHistory] = useState([]);

  const {
    token, user: {
      _id, name, email, role,
    },
  } = isAuthenticated();

  const init = (userId, token) => {
    getPurchaseHistory(userId, token)
      .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setHistory(data);
        }
      });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const userLinks = () => (
    <div className="card">
      <h4 className="card-header">User links</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link className="nav-link" to="/cart">My Cart</Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to={`/profile/${_id}`}>Update Profile</Link>
        </li>
      </ul>
    </div>
  );

  const userInfo = () => (
    <div className="card mb-5">
      <h3 className="card-header">User Information</h3>
      <ul className="list-group">
        <li className="list-group-item">{name}</li>
        <li className="list-group-item">{email}</li>
        <li className="list-group-item">{role === 1 ? 'Admin User' : 'Registered User'}</li>
      </ul>
    </div>
  );

  const purchaseHistory = history => (
    <div className="card mb-5">
      <h3 className="card-header">Purchase history</h3>
      <ul className="list-group">
        <li className="list-group-item">
          {history.map((h, i) => (
            <div>
              <hr />
              {h.products.map((p, i) => (
                <div key={i}>
                  <h6>
                            Product name:{p.name}
                          </h6>
                  <h6>
                            Product price: ${p.price}
                          </h6>
                  <h6>
                            Purchased date:
{' '}
                            {moment(p.createdAt).fromNow()}
                          </h6>
                </div>
              ))}
            </div>
          ))}
        </li>
      </ul>
    </div>
  );

  return (
    <Layout title="Dashboard" description={`Welcome ${name}`} className="container">
      <div className="row">
        <div className="col-3">
          {userLinks()}
        </div>
        <div className="col-9">
          {userInfo()}
          {purchaseHistory(history)}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

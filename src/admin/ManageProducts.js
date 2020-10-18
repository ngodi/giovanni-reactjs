import React, { useState, useEffect } from 'react';
import Layout from "../core/Layout";
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

const ManageProducts = () => {
    return (
        <Layout 
           title="Manage products" 
           description="wPerform CRUD on products" 
           className="container-fluid"
        >
        <div className="row">
            <div className="col-8">...</div>
        </div>
        </Layout>
    )
}

export default ManageProducts;
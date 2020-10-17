import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { read, update, updateUser } from './apiUser';
import { isAuthenticated } from '../auth';

const Profile = ({ match }) => {
   const [values, setValues] = useState({
       name: '',
       email: '',
       password: '',
       error: false,
       success: false
   })
   const { token } = isAuthenticated();

   const { name, email, password, error, success } = values;

   const init = (userId) => {
       read(userId, token).then(data => {
           if (data.error) {
               setValues({...values, error: true})
           } else {
               setValues({...values, name: data.name, email: data.email})
           }
       })
   }

   useEffect(() => {
       init(match.params.userId)
   }, [])
   
   const handleChange = name => event => {
       setValues({...values, error: false, [name]: event.target.value})
   };

   const clickSubmit = event => {
    event.preventDefault();
    update(match.params.userId, token, {name, email, password})
    .then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            updateUser(data, () => {
                setValues({
                    ...values, 
                    name: data.name, 
                    email: data.email, 
                    success: true
                });
            });
        }
    });
};

   const redirectUser = (success) => {
       if (success) {
           return <Redirect to="/cart" />
       }
   }

   const profileUpdate = (name, email, password) => (
       <form>
           <div className="form-group">
               <label className='text-muted'>Name</label>
               <input type="text" onChange={handleChange('name')} className="form-control" value={name}/>
           </div>
           <div className="form-group">
               <label className='text-muted'>Email</label>
               <input type="email" onChange={handleChange('email')} className="form-control" value={email}/>
           </div>
           <div className="form-group">
               <label className='text-muted'>Password</label>
               <input type="password" onChange={handleChange('password')} className="form-control" />
           </div>
           <button onClick={clickSubmit} className="btn btn-primary" type="submit">Submit</button>
       </form>
   )
   return (
    <Layout 
        title="Profile" 
        description="Update your profile" 
        className="container-fluid"
     >  
      <h2 className="mb-4">Profile Update</h2>
      {profileUpdate(name, email, password)}
      {redirectUser(success)}
    </Layout>
  );
};

export default Profile;
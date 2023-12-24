
import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import './Home.css';
import { NavLink,useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { BASE_URL } from '../../app/user/userApi';
import axios from 'axios';
import { updateUser } from '../../app/user/userSlice';
import { default_profile_link } from '../../assets/defaultprofile';

const Home = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const storedToken = localStorage.getItem('jwtToken');
  const [isLoading, setIsLoading] = useState(true);
  let decodedToken;
  const dispatch = useDispatch();

  if (storedToken) {
    decodedToken = jwtDecode(storedToken);
  }

  useEffect(() => {
    if (!storedToken) {
      navigate('/');
    } else {
      UserDetails();
    }
  }, [storedToken]);

  useEffect(() => {
    if (!user.user && !isLoading) {
      navigate('/loginpage');
    }
  }, [user.user, isLoading]);

  async function UserDetails() {
    try {
      const response = await axios.get(`${BASE_URL}/users/user-detail/${decodedToken.user_id}/`);
      dispatch(updateUser(response.data));
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setIsLoading(false);
    }
  }



  return (
    <>
      <Layout>
        <div className='maindivuser'>

          {isLoading ? (
            <p>Loading...</p>
          ) : user.user ? (
            <div className='details'>
              {
                !user.user ? <p className='heading'>Your are not logged in </p> : <p className='heading'>Login in</p>
              }
              <div className=''>
                <img src={default_profile_link} />
                <p>Welcome, {user.user.first_name + ' ' + user.user.last_name}</p>
                <p>Email: {user.user.email}</p>
                <p>User Status: {user.user.is_admin ? 'Admin' : 'Staff/User'}</p>
                <NavLink className='edituser' to='/edituser'>
                  Edit the user details
                </NavLink>
              </div>
            </div>
          ) : (
            <p className='errorfornotlogin'>You are not logged in. Please log in.</p>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Home;

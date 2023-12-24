import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import './Admin.css'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { superUserLogin } from '../../app/user/userSlice'
import { jwtDecode } from 'jwt-decode'





const Admin = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const check = useSelector((state) => state.user);

    const [adminUser, setAdminUser] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const loginpage = (e) => {
        setAdminUser({ ...adminUser, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const adminLogin = async () => {
        if (!adminUser.email || !adminUser.password) {
            setErrors({ ...errors, email: 'Email and password are required' });
            return;
        }

        try {
            const decodedToken = await dispatch(superUserLogin(adminUser));

            if (decodedToken.payload.is_admin) {
                navigate('/admindashboard');
            }
            else if (decodedToken.payload.is_admin == false) {
                setErrors({ ...errors, email: 'Only admins are allowed to log in.' });
            }
            else {
                setErrors({ ...errors, email: 'Only admins are allowed to log in.' });
            }
        } catch (error) {
            console.error('Login error:', error);
            if (error.response && error.message === "Request failed with status code 401") {
                setErrors({ ...errors, email: 'Invalid email or password. Please try again.' });

            } else {
                setErrors({ ...errors, email: 'An error occurred. Please try again.' });
            }
        }
    }; return (
        <>
            <Layout>
                <div className='alignment'>
                    <div className='loginContainer'>
                        <div>
                            <p>Admin Login</p>
                        </div>
                        <div className='errmessage'>
                            {/* <p>{err}</p> */}
                        </div>
                        <div className="data">
                            <label htmlFor="email">Email</label>
                            <input onChange={loginpage} type="email" name="email" placeholder='Enter The email' id="email" />
                        </div>
                        <div className="data">
                            <label htmlFor="email">Password</label>
                            <input onChange={loginpage} placeholder='Enter the password' type="password" name="password" id="Password" />
                        </div>
                        <div>
                            <button onClick={adminLogin} type='button'>Login</button>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Admin

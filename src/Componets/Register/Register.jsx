
import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { userRegistation } from '../../app/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

const Register = () => {
    const registrationError = useSelector((state) => state.user.error);
    const registeredUser = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const [formData, setFormdata] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        repeatpassword: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        repeatpassword: '',
    });

    const handleInputChange = (e) => {
        setFormdata({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validateForm = () => {
        const { first_name, last_name, email, password, repeatpassword } = formData;
        const newErrors = {};

        if (!validator.isEmail(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!validator.isLength(password, { min: 6 })) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        if (!validator.equals(password, repeatpassword)) {
            newErrors.repeatpassword = 'Passwords do not match';
        }

        if (!validator.isAlpha(first_name)) {
            newErrors.first_name = 'First name should only contain letters';
        }

        if (validator.isEmpty(first_name)) {
            newErrors.first_name = 'First name cannot be empty';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const registerUser = () => {
        if (validateForm()) {
            dispatch(userRegistation(formData))
                .then(() => {
                    navigate('/loginpage');
                });
        }
    };

    return (
        <>
            <Layout  title='Auth | Login | Register Window' content='Register Window'>
                <div className='alignment'>
                    <div className='signContainer'>
                        <div className='registration'>
                            {registeredUser && (
                                <div className='reg'>
                                    <p>User successfully registered:</p>
                                </div>
                            )}
                        </div>
                        <div className={`data ${errors.email && 'error'}`}>
                            <label id='email' htmlFor=''>Enter the Email Address</label>
                            <input type='text' onChange={handleInputChange} placeholder='Enter the email' name='email' id='email' className={errors.email ? 'input-error' : ''} />
                            {errors.email && <p className='error-message'>{errors.email}</p>}
                        </div>
                        <div className={`data ${errors.first_name && 'error'}`}>
                            <label id='first_name' htmlFor=''>Enter the firstname</label>
                            <input type='text' onChange={handleInputChange} name='first_name' placeholder='Enter the firstname' id='first_name' className={errors.first_name ? 'input-error' : ''} />
                            {errors.first_name && <p className='error-message'>{errors.first_name}</p>}
                        </div>
                        <div className={`data ${errors.last_name && 'error'}`}>
                            <label id='last_name' htmlFor=''>Enter the lastname</label>
                            <input type='text' onChange={handleInputChange} name='last_name' placeholder='Enter the lastname' id='last_name' className={errors.last_name ? 'input-error' : ''} />
                            {errors.last_name && <p className='error-message'>{errors.last_name}</p>}
                        </div>
                        <div className={`data ${errors.password && 'error'}`}>
                            <label id='password' htmlFor=''>Enter the password</label>
                            <input type='password' onChange={handleInputChange} name='password' placeholder='Enter the password' id='password' className={errors.password ? 'input-error' : ''} />
                            {errors.password && <p className='error-message'>{errors.password}</p>}
                        </div>
                        <div className={`data ${errors.repeatpassword && 'error'}`}>
                            <label id='repeatpassword' htmlFor=''>Enter the repeatpassword</label>
                            <input type='password' onChange={handleInputChange} name='repeatpassword' placeholder='Enter the repeatpassword' id='repeatpassword' className={errors.repeatpassword ? 'input-error' : ''} />
                            {errors.repeatpassword && <p className='error-message'>{errors.repeatpassword}</p>}
                        </div>
                        <div className='button'>
                            <button onClick={registerUser}>Register</button>
                            {registrationError && <p className='error-message'>Error: {registrationError}</p>}
                        </div>
                        <div className='account'>
                            <a href="/loginpage">I have alredy an account</a>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Register;

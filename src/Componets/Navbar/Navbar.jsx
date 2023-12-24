import React from 'react';
import './Navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../app/user/userSlice';

const Navbar = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    console.log(user)

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('jwtTokenadmin');
        dispatch(logout());
    };

    const guestLinks = (
        <>
            <li>
                <NavLink className='linkli' to='/loginpage'>
                    Login
                </NavLink>
            </li>
            <li>
                <NavLink className='linkli' to='/registerpage'>
                    Register
                </NavLink>
            </li>
            <li>
                <NavLink className='linkli' to='/admin'>
                    Admin Login 
                </NavLink>
            </li>
        </>
    );

    const userLinks = (
        <>
            <li>
                <NavLink className='linkli' to='/'>
                    Profile
                </NavLink>
            </li>
            <li>
                <NavLink onClick={handleLogout} className='linkli'>
                    Logout
                </NavLink>
            </li>
        </>
    );

    const adminLinks = (
        <>
            <li>
                <NavLink className='linkli' to='/admindashboard'>
                    Admin Dashboard
                </NavLink>
            </li>
            <li>
                <NavLink onClick={handleLogout} className='linkli' to='/admin'>
                    Admin Logout
                </NavLink>
            </li>
        </>
    );

    return (
        <div className='nav'>
            <div className='navbar'>
                <div>
                    <h1>Navbar</h1>
                </div>
                <div className='lists'>

                {user.superuser ? adminLinks : user.user ? userLinks : guestLinks}

                 
                </div>
            </div>
        </div>
    );
};

export default Navbar;

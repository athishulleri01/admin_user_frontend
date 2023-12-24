import React, { useEffect, useState } from 'react';
import Layout from '../Componets/Layout/Layout';
import axios from 'axios';

const Admin = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/users/all-users/', {
                    withCredentials: true,
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <Layout title='Auth | Admin | Dashboard' content='Dashboard page'>
            <div>
                <h2>All Users</h2>
                {userData.length > 0 ? (
                    userData.map(user => (
                        <div key={user.id}>
                            <p>First Name: {user.first_name}</p>
                            <p>Last Name: {user.last_name}</p>
                            <p>Email: {user.email}</p>
                            <hr />
                        </div>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </Layout>
    );
};

export default Admin;

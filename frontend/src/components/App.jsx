import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import UserList from './UserList';
import api from '../api';

const App = () => {
    const [users, setUsers] = useState([]);

    // Fetch users when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/users');
                setUsers(response.data); // Update users with the fetched data
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="app">
            <h1>User Management</h1>
            <UserForm setUsers={setUsers} />
            <UserList users={users} />
        </div>
    );
};

export default App;

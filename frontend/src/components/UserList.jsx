import React, { useState, useEffect } from 'react';
import api from '../api'; // Ensure this is your API configuration

const UserList = () => {
    const [users, setUsers] = useState([]);

    // Fetch users from the API when the component mounts
    const fetchUsers = async () => {
        try {
            const response = await api.get('/users');
            setUsers(response.data); // Set the users state to the fetched data
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Delete user by ID
    const deleteUser = async (id) => {
        try {
            await api.delete(`/users/${id}`);
            // Remove the deleted user from the state
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []); // Empty array ensures this effect runs only once when the component mounts

    // If no users are available, show a message
    if (users.length === 0) {
        return <p>No users available. Please add a user.</p>;
    }

    return (
        <div className="user-list">
            <h2>Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} ({user.age} years old) - {user.email}
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;

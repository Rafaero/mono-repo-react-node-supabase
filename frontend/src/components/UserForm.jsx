import React, { useState } from 'react';
import api from '../api';
import "./UserForm.css";

const UserForm = ({ setUsers }) => {
    const [formData, setFormData] = useState({ name: '', email: '', age: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.email || !formData.age) {
            setError('All fields are required');
            return;
        }

        try {
            const response = await api.post('/users', formData);

            // If user is successfully added, update the users list
            if (response.data) {
                setUsers((prevUsers) => [...prevUsers, response.data]); // Add new user to list
            }

            // Clear the form after successful submit
            setFormData({ name: '', email: '', age: '' });
            setError(''); // Clear any previous error messages
        } catch (error) {
            console.error('Error adding user:', error.response ? error.response.data : error.message);
            setError('Failed to add user');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
                <button type="submit">Add User</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error messages */}
        </div>
    );
};

export default UserForm;

import express from 'express';
import cors from 'cors';
import supabase from './supabase.mjs';

const app = express();

// Enable CORS for all origins (or specify a specific origin like 'http://localhost:5173')
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));


// To parse JSON bodies
app.use(express.json());

// Example: Fetch all users
app.get('/api/users', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('users') // Table name
            .select('*');  // Select all columns

        if (error) {
            console.error('Error fetching users:', error);
            return res.status(500).send('Error fetching users');
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
});

// Example: Add a new user
app.post('/api/users', async (req, res) => {
    const { name, email, age } = req.body;

    // Validate input fields
    if (!name || !email || !age) {
        return res.status(400).json({ error: 'Name, email, and age are required.' });
    }

    try {
        const { data, error } = await supabase
            .from('users')
            .insert({ name, email, age });

        if (error) {
            console.error('Error adding user:', error);
            return res.status(500).json({ error: 'Failed to add user' });
        }

        if (!data || data.length === 0) {
            return res.status(400).json({ error: 'Failed to insert user' });
        }

        // Return only the new user added
        res.status(201).json(data[0]);
    } catch (error) {
        console.error('Error during request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Example: Update a user
app.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const { age } = req.body;

    // Validate input fields
    if (!age) {
        return res.status(400).json({ error: 'Age is required to update.' });
    }

    try {
        const { data, error } = await supabase
            .from('users') // Table name
            .update({ age }) // Update age column
            .eq('id', id);   // Where id matches

        if (error) {
            console.error('Error updating user:', error);
            return res.status(500).json({ error: 'Error updating user' });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Error updating user' });
    }
});

// Example: Delete a user
app.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .from('users') // Table name
            .delete()
            .eq('id', id); // Where id matches

        if (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({ error: 'Error deleting user' });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Error deleting user' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

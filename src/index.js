const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above





let users = {}; 
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: 'Need name and email!' });
    }
    const id = Date.now().toString();
    users[id] = { id, name, email }; 
    console.log("User created successfully! ", users[id]);
    res.status(201).json(users[id]);
});

app.get('/users/:id', (req, res) => {
    const user = users[req.params.id];
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});

app.put('/users/:id', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: 'Need name and email!' });
    }
    if (!users[req.params.id]) {
        return res.status(404).json({ message: 'user not found!!' });
    }
    users[req.params.id] = { ...users[req.params.id], name, email };
    res.json(users[req.params.id]);
});

app.delete('/users/:id', (req, res) => {
    if (!users[req.params.id]) {
        return res.status(404).json({ message: 'user not found!' });
    }
    delete users[req.params.id]; 
    res.status(204).send();
});


// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing
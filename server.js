const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// JavaScript object to act as the endpoint
let projectData = {};

// GET route to send projectData
app.get('/all', (req, res) => {
    res.send(projectData);
});

// POST route to add data to projectData
app.post('/add', (req, res) => {
    projectData = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse
    };
    res.send(projectData);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

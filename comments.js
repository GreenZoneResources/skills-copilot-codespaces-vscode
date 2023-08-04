// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

// Create web server
const app = express();

// Enable Cross Origin Resource Sharing so this API can be used from web-apps on other domains
app.use(cors());

// Enable parsing of posted data
app.use(bodyParser.json());

// Enable parsing of URL encoded data
app.use(bodyParser.urlencoded({
    extended: true
}));

// Create comments array
const comments = [
    {
        username: 'bob',
        comment: 'first comment'
    },
    {
        username: 'jane',
        comment: 'second comment'
    }
];

// Get all comments
app.get('/comments', (req, res) => {
    // Return all comments
    res.json(comments);
});

// Add a new comment
app.post('/comments', async (req, res) => {
    // Extract username and comment from request body
    const { username, comment } = req.body;

    // Create a new comment
    const newComment = {
        username,
        comment
    };

    // Push new comment into comments array
    comments.push(newComment);

    // Send new comment back as response
    res.json(newComment);

    // Create event object
    const event = {
        type: 'CommentCreated',
        data: newComment
    };

    // Send event to event bus
    await axios.post('http://localhost:4005/events', event);
});

// Listen for incoming requests on port 4001
app.listen(4001, () => {
    console.log('Listening on 4001');
});

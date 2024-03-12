const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

// Import routers
const readUsers = require('./readUsers');
const writeUsers = require('./writeUsers');

// Use the direct path instead of path.resolve
const usersFilePath = '/Users/rahulchettri/Desktop/learn-express-03112024/data/users.json';

// Load users data from a file on server start
let users;
fs.readFile(usersFilePath, (err, data) => {
    console.log('reading file ... ');
    if (err) throw err;
    users = JSON.parse(data);
    console.log('Users data loaded successfully.');
});

// Middleware to add users data to the request object if available
const addMsgToRequest = function (req, res, next) {
    if (users) {
        req.users = users;
        next();
    } else {
        return res.status(404).json({
            error: { message: 'users not found', status: 404 }
        });
    }
};

app.use(cors({ origin: 'http://localhost:3000' }));

// Apply middleware globally
app.use(addMsgToRequest);

// Use routers
app.use('/read', readUsers);
app.use('/write', writeUsers);

// Middleware for parsing JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
      message: 'Welcome to the Express API!',
      availableEndpoints: [
          { method: 'GET', path: '/read/usernames', description: 'List all usernames' },
          { method: 'POST', path: '/write/adduser', description: 'Add a new user' },
      ]
  });
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

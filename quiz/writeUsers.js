const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.post('/adduser', (req, res) => {
  // Assuming users data is available via req.users
  if (!req.body || !req.body.username) {
    return res.status(400).json({ error: 'User data is missing or incomplete' });
  }

  const newUser = {
    // You might want to generate a unique ID for the new user
    id: Date.now(), // Simplified method for generating a unique ID
    username: req.body.username
  };

  // Add the new user to the existing users array
  req.users.push(newUser);

  // Save the updated users array back to the file
  fs.writeFile(path.resolve(__dirname, '../data/users.json'), JSON.stringify(req.users, null, 2), err => {
    if (err) {
      console.error('Failed to save the new user', err);
      return res.status(500).json({ error: 'Failed to save the new user' });
    }
    res.status(201).send('User added successfully');
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();

// Assuming users data is available globally or passed via middleware
router.get('/usernames', (req, res) => {
  if (!req.users) {
    return res.status(404).json({ error: 'Users data not loaded' });
  }
  const usernames = req.users.map(user => ({
    id: user.id,
    username: user.username
  }));
  res.json(usernames);
});

module.exports = router;

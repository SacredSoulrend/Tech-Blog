const router = require('express').Router();
const { User } = require('../models');

// Route to create a new user (user registration)
router.post('/signup', async (req, res) => {
  try {
    // Create a new user with the username, email, and password from the request body
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // Set the session variables to log in the new user
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to log in an existing user
router.post('/login', async (req, res) => {
  try {
    // Find the user by their email
    const userData = await User.findOne({
      where: { email: req.body.email },
    });

    if (!userData) {
      res.status(400).json({ message: 'User not found' });
      return;
    }

    // Check if the entered password matches the stored password
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(401).json({ message: 'Incorrect password' });
      return;
    }

    // Set the session variables to log in the user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.status(200).json({ user: userData, message: 'You are now logged in' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to log out the current user
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    // Clear the session variables and end the session
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

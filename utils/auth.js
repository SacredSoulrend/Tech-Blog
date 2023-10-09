const bcrypt = require('bcrypt');
const { User } = require('../models');

// Function to check if the provided password matches the stored hashed password
const checkPassword = async (username, password) => {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return false; // User does not exist

    const passwordMatch = await bcrypt.compare(password, user.password);
    return passwordMatch;
  } catch (error) {
    console.error(error);
    return false; // An error occurred
  }
};

// Middleware function to check if a user is logged in
const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = { checkPassword, withAuth };

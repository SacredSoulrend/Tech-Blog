const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

// Route to display the user's dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged-in user's information and their associated blog posts
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    if (!userData) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Serialize data for rendering in the template
    const user = userData.get({ plain: true });

    // Render the dashboard template with serialized data and session flag
    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

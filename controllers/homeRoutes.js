const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Route to display the homepage with blog posts
router.get('/', async (req, res) => {
  try {
    // Get all blog posts and their associated user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data for rendering in the template
    const blogPosts = postData.map((post) => post.get({ plain: true }));

    // Render the homepage template with serialized data and session flag
    res.render('homepage', { 
      blogPosts, 
      logged_in: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to display a single blog post by its ID
router.get('/post/:id', async (req, res) => {
  try {
    // Get the blog post by ID and include the user who created it
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data for rendering in the template
    const blogPost = postData.get({ plain: true });

    // Render the single post template with serialized data and session flag
    res.render('singlePost', {
      ...blogPost,
      logged_in: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to display the user's profile (dashboard)
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged-in user's information and their associated blog posts
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

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

// Route to display the login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the dashboard
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  // Render the login template
  res.render('login');
});

module.exports = router;

const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// Route to create a new blog post (requires authentication)
router.post('/add', withAuth, async (req, res) => {
  try {
    // Create a new blog post with the title, content, and user ID from the session
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id, // User ID from the session
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to update a blog post (requires authentication)
router.put('/update/:id', withAuth, async (req, res) => {
  try {
    // Find the blog post by ID
    const postData = await Post.findByPk(req.params.id);

    if (!postData) {
      res.status(404).json({ message: 'Blog post not found' });
      return;
    }

    // Check if the logged-in user is the author of the blog post
    if (postData.user_id !== req.session.user_id) {
      res.status(403).json({ message: 'You are not authorized to update this blog post' });
      return;
    }

    // Update the blog post title and content
    postData.title = req.body.title;
    postData.content = req.body.content;

    // Save the updated blog post
    await postData.save();

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete a blog post (requires authentication)
router.delete('/delete/:id', withAuth, async (req, res) => {
  try {
    // Find the blog post by ID
    const postData = await Post.findByPk(req.params.id);

    if (!postData) {
      res.status(404).json({ message: 'Blog post not found' });
      return;
    }

    // Check if the logged-in user is the author of the blog post
    if (postData.user_id !== req.session.user_id) {
      res.status(403).json({ message: 'You are not authorized to delete this blog post' });
      return;
    }

    // Delete the blog post and associated comments
    await postData.destroy();

    res.status(200).json({ message: 'Blog post deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

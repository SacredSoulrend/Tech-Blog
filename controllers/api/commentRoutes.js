const router = require('express').Router();
const { Comment } = require('../models');
const withAuth = require('../utils/auth');

// Route to add a new comment to a blog post (requires authentication)
router.post('/add/:post_id', withAuth, async (req, res) => {
  try {
    // Create a new comment with the text and the user ID from the session
    const newComment = await Comment.create({
      text: req.body.text,
      user_id: req.session.user_id, // User ID from the session
      post_id: req.params.post_id,  // Blog post ID from the URL params
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to update a comment (requires authentication)
router.put('/update/:id', withAuth, async (req, res) => {
  try {
    // Find the comment by ID
    const commentData = await Comment.findByPk(req.params.id);

    if (!commentData) {
      res.status(404).json({ message: 'Comment not found' });
      return;
    }

    // Check if the logged-in user is the author of the comment
    if (commentData.user_id !== req.session.user_id) {
      res.status(403).json({ message: 'You are not authorized to update this comment' });
      return;
    }

    // Update the comment text
    commentData.text = req.body.text;

    // Save the updated comment
    await commentData.save();

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete a comment (requires authentication)
router.delete('/delete/:id', withAuth, async (req, res) => {
  try {
    // Find the comment by ID
    const commentData = await Comment.findByPk(req.params.id);

    if (!commentData) {
      res.status(404).json({ message: 'Comment not found' });
      return;
    }

    // Check if the logged-in user is the author of the comment
    if (commentData.user_id !== req.session.user_id) {
      res.status(403).json({ message: 'You are not authorized to delete this comment' });
      return;
    }

    // Delete the comment
    await commentData.destroy();

    res.status(200).json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

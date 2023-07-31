const express = require('express');
const router = express.Router();
const {
  createPost,
  createComment,
  getPosts,
  deletePost,
  deleteComment,
} = require('../controllers/posts');
const { authenticateTokenCheck } = require('../controllers/users');

// /api/posts/
router.post('/', authenticateTokenCheck, createPost);

// /api/posts/post/comment
router.post('/post/comment', authenticateTokenCheck, createComment);

// /api/posts
router.get('/', authenticateTokenCheck, getPosts);

// /api/posts/post
router.delete('/:postId', authenticateTokenCheck, deletePost);

// /api/posts/post/comment
router.delete('/:postId/comments/:commentId', authenticateTokenCheck, deleteComment);

module.exports = router;

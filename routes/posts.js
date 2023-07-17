const express = require('express');
const router = express.Router();
const {
  createPost,
  createComment,
  getPosts,
  deletePost,
  deleteComment,
} = require('../controllers/posts');

// /api/posts/
router.post('/', createPost);

// /api/posts/post/comment
router.post('/post/comment', createComment);

// /api/posts
router.get('/', getPosts);

// /api/posts/post
router.delete('/:postId', deletePost);

// /api/posts/post/comment
router.delete('/:postId/comments/:commentId', deleteComment);

module.exports = router;

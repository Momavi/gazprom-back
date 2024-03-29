const { prisma } = require('../prisma/prisma-client');
const { getAllPosts, findUserById, handleError } = require('./postsHelper');

const createPost = async (req, res) => {
  const { userId, message } = req.body;
  if ( !userId || !message ) {
    return res.status(400).json({ message: 'Please provide required fields' });
  }
  const user = await findUserById(userId);
  if ( !user ) {
    return res.status(400).json({ message: 'User not found' });
  }

  const post = await prisma.post.create({
    data: {
      message,
      user: { connect: { id: userId } },
    },
  });
  if ( post ) {
    try {
      const posts = await getAllPosts();
      if ( posts ) {
        res.status(201).json(posts);
      } else {
        return res.status(404).json({ message: 'Posts not found' });
      }
    } catch ( error ) {
      handleError(error);
    }
  } else {
    return res.status(400).json({ message: 'Failed to create post' });
  }
};

const createComment = async (req, res) => {
  const { postId, userId, message } = req.body;
  if ( !postId || !userId || !message ) {
    return res.status(400).json({ message: 'Please provide required fields' });
  }
  try {
    const comment = await prisma.comment.create({
      data: {
        message,
        postId,
        userId,
      },
    });
    comment.user = await findUserById(userId);
    if ( comment ) {
      res.status(201).json(comment);
    } else {
      return res.status(400).json({ message: 'Failed to create comment' });
    }
  } catch ( error ) {
    return handleError(res, error);
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await getAllPosts();
    if ( posts ) {
      res.status(200).json(posts);
    } else {
      return res.status(404).json({ message: 'Posts not found' });
    }
  } catch ( error ) {
    return handleError(res, error);
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    if ( !postId ) {
      return res.status(400).json({ message: 'Введите post id' });
    }

    // Find the post first
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    // If the post does not exist, return an error
    if ( !post ) {
      return res.status(404).json({ message: 'Пост не найден' });
    }

    if ( !('userId' in post) ) {
      post.userId = undefined;
    }
    // Check if the user is the owner of the post
    if ( post.userId !== req.user.id ) {
      return res.status(403).json({ message: 'У вас нет доступа' });
    }

    // If the user is the owner, proceed with the deletion
    await prisma.comment.deleteMany({
      where: { postId: postId },
    });

    await prisma.post.delete({
      where: { id: postId },
    });

    const posts = await getAllPosts();
    if ( posts ) {
      res.status(200).json(posts);
    } else {
      return res.status(404).json({ message: 'Посты не найдены' });
    }
  } catch ( error ) {
    return handleError(res, error);
  }
};

const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  if ( !commentId ) {
    return res.status(400).json({ message: 'Введите commentId' });
  }

  try {
    let comment;

    if ( commentId === process.env.NO_DELETE_POST_ID ) {
      comment = await prisma.comment.findUnique({
        where: { id: commentId },
      });
    } else {
      comment = await prisma.comment.delete({
        where: { id: commentId },
      });
    }

    const user = await findUserById(comment.userId);

    const commentWithUser = {
      ...comment,
      user: user,
    };

    return res.status(200).json(commentWithUser);
  } catch ( error ) {
    return handleError(res, error);
  }
};

module.exports = {
  createPost,
  createComment,
  deletePost,
  deleteComment,
  getPosts,
};

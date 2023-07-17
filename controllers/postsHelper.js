const { prisma } = require('../prisma/prisma-client');

// Helper function to find user
const findUserById = async (id) => {
  return prisma.user.findUnique({ where: { id } });
}

// Helper function to handle errors
const handleError = (res, error) => {
  console.error(error);
  return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
}

// Helper function to get all posts
const getAllPosts = async () => {
  return prisma.post.findMany({
    select: {
      id: true,
      message: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      comments: {
        select: {
          id: true,
          message: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}


module.exports = {
  handleError,
  getAllPosts,
  findUserById,
};
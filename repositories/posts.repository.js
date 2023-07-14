const { Op } = require('sequelize');
const { Posts } = require('../models');

class PostRepository {
  createPost = async (userId, nickname, title, content) => {
    const createPostData = await Posts.create({
      userId,
      nickname,
      title,
      content,
      likes: 0,
    });
    return createPostData;
  };

  findAllPost = async () => {
    const allPost = await Posts.findAll({
      attributes: [
        'postId',
        'userId',
        'nickname',
        'title',
        'createdAt',
        'updatedAt',
      ],
      order: [['createdAt', 'desc']],
    });
    return allPost;
  };

  findDetailPost = async (postId) => {
    const post = await Posts.findOne({
      where: { postId: postId },
      attributes: [
        'postId',
        'userId',
        'nickname',
        'title',
        'content',
        'createdAt',
        'updatedAt',
      ],
    });
    return post;
  };

  checkPost = async (postId) => {
    const post = await Posts.findOne({
      where: { postId: postId },
    });
    return post;
  };

  updatePost = async (postId, title, content) => {
    const post = await Posts.update(
      { title, content },
      { where: { postId: postId } }
    );
    return post;
  };

  deletePost = async (postId, nickname) => {
    const post = await Posts.destroy({
      where: {
        [Op.and]: [{ postId }, { nickname }],
      },
    });
    return post;
  };
}

module.exports = PostRepository;
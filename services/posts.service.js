const PostRepository = require('../repositories/posts.repository');

class PostService {
  postRepository = new PostRepository();

  createPost = async (userId, nickname, title, content) => {
    const createPostData = await this.postRepository.createPost(
      userId,
      nickname,
      title,
      content
    );
    return createPostData;
  };

  findAllPost = async () => {
    const allPost = await this.postRepository.findAllPost();
    return allPost;
  };

  findDetailPost = async (postId) => {
    const post = await this.postRepository.findDetailPost(postId);
    return post;
  };

  checkPost = async (postId) => {
    const post = await this.postRepository.checkPost(postId);
    return post;
  };

  updatePost = async (postId, title, content) => {
    const post = await this.postRepository.updatePost(postId, title, content);
    return post;
  };

  deletePost = async (postId, nickname) => {
    const post = await this.postRepository.deletePost(postId, nickname);
    return post;
  };
}

module.exports = PostService;
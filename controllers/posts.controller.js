const PostService = require('../services/posts.service');

class PostsController {
  postService = new PostService();

  createPost = async (req, res, next) => {
    try {
      const { title, content } = req.body;
      const { nickname, userId } = res.locals.user;
      await this.postService.createPost(userId, nickname, title, content);
    } catch (err) {
      console.log(err.message);
      return res
        .status(400)
        .json({ errorMessage: '게시글 작성에 실패하였습니다.' });
    }
    return res.status(201).json({ message: '게시글 작성에 성공하였습니다.' });
  };

  getPosts = async (req, res, next) => {
    try {
      const posts = await this.postService.findAllPost();
      return res.status(200).json({ data: posts });
    } catch (err) {
      console.log(err.message);
      return res
        .status(400)
        .json({ errorMessage: '게시글 조회에 실패하였습니다.' });
    }
  };

  getDetailPost = async (req, res, next) => {
    const { postId } = req.params;
    try {
      const post = await this.postService.findDetailPost(postId);

      if (!post)
        return res
          .status(404)
          .json({ errorMessage: '게시글이 존재하지 않습니다.' });

      return res.status(200).json({ post: post });
    } catch (err) {
      console.log(err.message);
      return res
        .status(400)
        .json({ errorMessage: '게시글 조회에 실패하였습니다.' });
    }
  };

  updatePost = async (req, res, next) => {
    const { postId } = req.params;
    const { title, content } = req.body;
    const { nickname, userId } = res.locals.user;
    try {
      const post = await this.postService.checkPost(postId);

      if (!post)
        return res
          .status(404)
          .json({ errorMessage: '게시글이 존재하지 않습니다.' });

      if (post.nickname !== nickname)
        return res
          .status(403)
          .json({ errorMessage: '게시글 수정의 권한이 존재하지 않습니다.' });

      await this.postService.updatePost(postId, title, content).catch((err) => {
        return res
          .status(401)
          .json({ errorMessage: '게시글이 정상적으로 수정되지 않았습니다.' });
      });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ errorMessage: '게시글 수정에 실패하였습니다.' });
    }
    return res.status(200).json({ message: '게시글을 수정하였습니다.' });
  };

  deletePost = async (req, res, next) => {
    const { postId } = req.params;
    const { nickname } = res.locals.user;
    try {
      const post = await this.postService.checkPost(postId);

      if (!post)
        return res
          .status(404)
          .json({ errorMessage: '게시글이 존재하지 않습니다.' });

      if (!nickname || post.nickname !== nickname)
        return res
          .status(403)
          .json({ errorMessage: '게시글 수정의 권한이 존재하지 않습니다.' });

      await this.postService.deletePost(postId, nickname).catch((err) => {
        return res
          .status(401)
          .json({ errorMessage: '게시글이 정상적으로 삭제되지 않았습니다.' });
      });
    } catch (err) {
      console.log(err.message);
      return res
        .status(400)
        .json({ errorMessage: '게시글 삭제에 실패하였습니다.' });
    }
    return res.status(200).json({ message: '게시글을 삭제하였습니다.' });
  };
}

module.exports = PostsController;
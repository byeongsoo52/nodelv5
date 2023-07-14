const LikeService = require('../services/likes.service');

class LikesController {
  likeService = new LikeService();

  postLike = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId } = res.locals.user;
      const post = await this.likeService.findDetailPost(postId);

      if (!post)
        return res
          .status(404)
          .json({ errorMessage: '게시글이 존재하지 않습니다.' });

      const like = await this.likeService.checkLike(postId, userId);

      if (!like) {
        await this.likeService.postLike(postId, userId);
        return res
          .status(200)
          .json({ message: '게시글의 좋아요를 등록하였습니다.' });
      } else {
        await this.likeService.postLikeCancel(postId, userId);
        return res
          .status(200)
          .json({ message: '게시글의 좋아요를 취소하였습니다.' });
      }
    } catch (err) {
      console.log(err.message);
      return res
        .status(400)
        .json({ errorMessage: '게시글 좋아요 실패하였습니다.' });
    }
  };

  myPostLike = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const posts = await this.likeService.myPostLike(userId);
      return res.status(200).json({ posts });
    } catch (err) {
      console.log(err.message);
      return res
        .status(400)
        .json({ errorMessage: '좋아요 게시글 조회에 실패하였습니다.' });
    }
  };
}

module.exports = LikesController;
const CommentService = require('../services/comments.service');

class CommentsController {
  commentService = new CommentService();

  getComments = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const post = await this.commentService.checkPost(postId);

      if (!post)
        return res
          .status(404)
          .json({ errorMessage: '게시글이 존재하지 않습니다.' });

      const comments = await this.commentService.getComments(postId);

      return res.status(200).json({ comments: comments });
    } catch (err) {
      console.log(err.message);
      return res
        .status(400)
        .json({ errorMessage: '댓글 조회에 실패하였습니다.' });
    }
  };

  createComment = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { comment } = req.body;
      const { nickname, userId } = res.locals.user;
      const post = await this.commentService.checkPost(postId);

      if (!post)
        return res
          .status(404)
          .json({ errorMessage: '게시글이 존재하지 않습니다.' });

      const comments = await this.commentService.createComment(
        postId,
        userId,
        nickname,
        comment
      );
    } catch (err) {
      console.log(err.message);
      return res
        .status(400)
        .json({ errorMessage: '댓글 작성에 실패하였습니다.' });
    }
    return res.status(200).json({ message: '댓글을 생성하였습니다.' });
  };

  updateComment = async (req, res, next) => {
    try {
      const { postId, commentId } = req.params;
      const { comment } = req.body;
      const { nickname, userId } = res.locals.user;
      const post = await this.commentService.checkPost(postId);

      if (!post)
        return res
          .status(404)
          .json({ errorMessage: '게시글이 존재하지 않습니다.' });

      const commentOne = await this.commentService.checkComment(commentId);

      if (!commentOne)
        return res
          .status(404)
          .json({ errorMessage: '댓글이 존재하지 않습니다.' });

      if (commentOne.nickname !== nickname)
        return res
          .status(403)
          .json({ errorMessage: '댓글의 수정 권한이 존재하지 않습니다.' });

      await this.commentService
        .updateComment(postId, userId, nickname, comment, commentId)
        .catch((err) => {
          return res.status(400).json({
            errorMessage: '댓글 수정이 정상적으로 처리되지 않았습니다.',
          });
        });
    } catch (err) {
      console.log(err.message);
      return res
        .status(400)
        .json({ errorMessage: '댓글 수정에 실패하였습니다.' });
    }
    return res.status(200).json({ message: '댓글을 수정하였습니다.' });
  };

  deleteComment = async (req, res, next) => {
    try {
      const { postId, commentId } = req.params;
      const { nickname, userId } = res.locals.user;
      const post = await this.commentService.checkPost(postId);

      if (!post)
        return res
          .status(404)
          .json({ errorMessage: '게시글이 존재하지 않습니다.' });

      const commentOne = await this.commentService.checkComment(commentId);

      if (!commentOne)
        return res
          .status(404)
          .json({ errorMessage: '댓글이 존재하지 않습니다.' });

      if (commentOne.nickname !== nickname)
        return res
          .status(403)
          .json({ errorMessage: '댓글의 삭제 권한이 존재하지 않습니다.' });

      await this.commentService.deleteComment(commentId).catch((err) => {
        return res.status(400).json({
          errorMessage: '댓글 삭제가 정상적으로 처리되지 않았습니다.',
        });
      });
    } catch (err) {
      console.log(err.message);
      return res
        .status(400)
        .json({ errorMessage: '댓글 삭제에 실패하였습니다.' });
    }
    return res.status(200).json({ message: '댓글을 삭제하였습니다.' });
  };
}

module.exports = CommentsController;
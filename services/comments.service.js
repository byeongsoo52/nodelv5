const CommentRepository = require('../repositories/comments.repository');
const PostRepository = require('../repositories/posts.repository');

class CommentService {
  commentRepository = new CommentRepository();
  postRepository = new PostRepository();

  checkPost = async (postId) => {
    const post = await this.postRepository.findDetailPost(postId);
    return post;
  };

  checkComment = async (commentId) => {
    const post = await this.commentRepository.checkComment(commentId);
    return post;
  };

  getComments = async (postId) => {
    const allComment = await this.commentRepository.getComments(postId);
    return allComment;
  };

  createComment = async (postId, userId, nickname, comment) => {
    const createCommentData = await this.commentRepository.createComment(
      postId,
      userId,
      nickname,
      comment
    );
    return createCommentData;
  };

  updateComment = async (postId, userId, nickname, comment, commentId) => {
    const commentData = await this.commentRepository.updateComment(
      postId,
      userId,
      nickname,
      comment,
      commentId
    );
    return commentData;
  };

  deleteComment = async (commentId) => {
    const commentData = await this.commentRepository.deleteComment(commentId);
    return commentData;
  };
}

module.exports = CommentService;
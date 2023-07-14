const express = require('express');
const { Posts, Comments } = require('../models');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const Validation = require('../middlewares/validation');
const validation = new Validation();
const CommentsController = require('../controllers/comments.controller');
const commentsController = new CommentsController();


// 댓글 목록 조회 API
router.get('/:postId/comments', commentsController.getComments);

// 댓글 생성 API
router.post('/:postId/comments', validation.commentValidation, authMiddleware, commentsController.createComment);

// 댓글 수정 API
router.put('/:postId/comments/:commentId', validation.commentValidation, authMiddleware, commentsController.updateComment);

// 댓글 삭제 API
router.delete('/:postId/comments/:commentId', authMiddleware, commentsController.deleteComment);


module.exports = router;
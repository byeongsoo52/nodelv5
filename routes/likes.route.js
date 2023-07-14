const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const LikesController = require('../controllers/likes.controller');
const likesController = new LikesController();

// 게시글 좋아요 API
router.put('/:postId/like', authMiddleware, likesController.postLike);

// 좋아요 게시글 조회 API
router.get('/like', authMiddleware, likesController.myPostLike);

module.exports = router;
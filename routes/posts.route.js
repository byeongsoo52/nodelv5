const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const Validation = require('../middlewares/validation');
const validation = new Validation(); 
const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();


// 게시글 작성
router.post('/', validation.postValidation, authMiddleware, postsController.createPost);

// 게시글 조회
router.get('/', postsController.getPosts);

// 게시글 상세 조회
router.get('/:postId', postsController.getDetailPost);

// 게시글 수정
router.put('/:postId', validation.postValidation, authMiddleware, postsController.updatePost);

// 게시글 삭제
router.delete('/:postId', authMiddleware, postsController.deletePost)


module.exports = router;
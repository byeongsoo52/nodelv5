const { check, body } = require('express-validator');
const { validationResult } = require('express-validator');

class validation {
  postValidation = [
    body('title').custom((value, { req }) => {
      if (!value && !req.body.content)
        throw new Error('데이터 형식이 올바르지 않습니다.');
      return true;
    }),
    check('title')
      .not()
      .isEmpty()
      .withMessage('게시글 제목의 형식이 일치하지 않습니다.'),
    check('content')
      .not()
      .isEmpty()
      .withMessage('게시글 내용의 형식이 일치하지 않습니다.'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // 에러가 존재한다면
        return res.status(412).json({ message: errors.array()[0].msg });
      }
      return next();
    },
  ];

  commentValidation = [
    check('comment')
      .not()
      .isEmpty()
      .withMessage('데이터 형식이 올바르지 않습니다.'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // 에러가 존재한다면
        return res.status(412).json({ message: errors.array()[0].msg });
      }
      return next();
    },
  ];
}

module.exports = validation;
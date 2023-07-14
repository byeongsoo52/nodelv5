const jwt = require("jsonwebtoken");
const { Users } = require("../models");

// 사용자 인증 미들웨어
module.exports = async (req, res, next) => {
  const { Authorization } = req.cookies;

  // 널 병합 연산자 (??)
  // authorization 쿠기가 존재하지 않았을 때를 대비
  const [authType, authToken] = (Authorization ?? "").split(" ");

  // authType === Bearer 값인지 확인
  // authToken 검증
  if (authType !== "Bearer" || !authToken) {
    res.status(403).json({
      errroMessage: "로그인이 필요한 기능입니다.",
    });
    return;
  }

  // jwt 검증
  try {
    // 1. authToken이 만료되었는지 확인
    // 2. authToken이 서버가 발급 해준 토큰이 맞는지 검증
    const { nickname } = jwt.verify(authToken, "customized-secret-key");

    // 3. authToken에 있는 userId에 해당하는 사용자가 실제 DB에 존재하는 지 확인
    const user = await Users.findOne({
      where: { nickname: nickname }
    });
    res.locals.user = user;
    next(); // 이 미들웨어 다음으로 보낸다.
  } catch (err) {
    console.error(err.message);
    res
      .status(403)
      .json({ errorMessage: "전달된 쿠키에서 오류가 발생하였습니다." });
    return;
  }
};

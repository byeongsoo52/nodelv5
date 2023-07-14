const AuthService = require('../services/auth.service');
const jwt = require('jsonwebtoken');

class AuthController {
  authService = new AuthService();

  signup = async (req, res, next) => {
    try {
      const { nickname, password, confirm } = req.body;
      // 닉네임 형식 검사
      const nicknameCheck = /^[a-zA-Z0-9]{3,}$/; // 최소 3자 이상, 알파벳 대소문자, 숫자로 구성
      if (!nicknameCheck.test(nickname)) {
        return res.status(412).json({
          errorMessage: '닉네임의 형식이 일치하지 않습니다.',
        });
      }

      // 패스워드 및 패스워드 확인
      if (password !== confirm) {
        return res.status(412).json({
          errorMessage: '패스워드가 일치하지 않습니다.',
        });
      }

      // 패스워드 형식 검사
      // 최소 4자 이상, 닉네임과 같은 값이 포함된 경우 회원가입에 실패
      let pw = password.toString();
      if (pw.length < 4) {
        return res.status(412).json({
          errorMessage: '패스워드가 형식이 일치하지 않습니다.',
        });
      } else if (pw.includes(nickname)) {
        return res.status(412).json({
          errorMessage: '패스워드에 닉네임이 포함되어 있습니다.',
        });
      }

      // 닉네임 중복 확인
      const existsNick = await this.authService.existsNick(nickname);

      if (existsNick) {
        return res.status(412).json({
          errorMessage: '중복된 닉네임입니다.',
        });
      }

      const user = await this.authService.signup(nickname, password);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        errorMessage: '요청한 데이터 형식이 올바르지 않습니다.',
      });
    }
    return res.status(201).json({
      message: '회원 가입에 성공하였습니다.',
    });
  };

  login = async (req, res, next) => {
    try {
      const { nickname, password } = req.body;
      const user = await this.authService.login(nickname);

      // DB에 닉네임이 없거나 사용자가 입력한 비밀번호와 일치하지 않은 경우
      if (!user || user.password !== password) {
        return res.status(412).json({
          errorMessage: '닉네임 또는 패스워드를 확인해주세요.',
        });
      }

      // jwt 생성
      const token = jwt.sign(
        { nickname: user.nickname },
        'customized-secret-key'
      );
      // 쿠키 생성
      res.cookie('Authorization', `Bearer ${token}`);
      return res.status(200).json({ token });
    } catch (err) {
      return res.status(400).json({
        errorMessage: '로그인에 실패하였습니다.',
      });
    }
  };
}

module.exports = AuthController;
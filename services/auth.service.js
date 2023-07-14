const AuthRepository = require('../repositories/auth.repository');

class AuthService {
  authRepository = new AuthRepository();

  signup = async (nickname, password) => {
    const user = await this.authRepository.signup(nickname, password);
    return user;
  };

  existsNick = async (nickname) => {
    const existsNick = await this.authRepository.existsNick(nickname);
    return existsNick;
  };

  login = async (nickname) => {
    const user = await this.authRepository.login(nickname);
    return user;
  };
}

module.exports = AuthService;
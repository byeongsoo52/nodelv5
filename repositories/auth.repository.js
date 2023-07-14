const { Users } = require('../models');

class AuthRepository {
  signup = async (nickname, password) => {
    const user = await Users.create({ nickname, password });
    return user;
  };

  existsNick = async (nickname) => {
    const existsNick = await Users.findOne({
      where: { nickname: nickname },
    });
    return existsNick;
  };

  login = async (nickname) => {
    const user = await Users.findOne({
      where: { nickname: nickname },
    });
    return user;
  };
}

module.exports = AuthRepository;
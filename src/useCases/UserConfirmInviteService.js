const UserRepository = require("../repository/UserRepository");
const userRepository = new UserRepository();
const bcrypt = require("bcryptjs");
const BussinesError = require("../errors/BussinesError");

class UserConfirmInviteService {
  async execute(params) {
    const { password, hash } = params;

    const isValidHash = await userRepository.getHash(hash);

    if (isValidHash.length == 0) {
      throw new BussinesError("Link inválido.");
    }

    const userId = isValidHash[0].user_id;
    const passwordHash = bcrypt.hashSync(password, 8);

    await userRepository.updatePasswordByUserId(passwordHash, userId);

    await userRepository.deleteHashInviteByHash(isValidHash[0].hash);
  }
}

module.exports = UserConfirmInviteService;

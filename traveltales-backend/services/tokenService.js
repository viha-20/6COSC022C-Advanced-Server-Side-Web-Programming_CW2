const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

class TokenService {
  static generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });
  }

  static verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

module.exports = TokenService;
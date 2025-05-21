const bcrypt = require('bcryptjs');
const UserDAO = require('../dao/UserDAO');

class AuthService {
  static async register({ username, email, password }) {
    // Check if user exists
    const existingUser = await UserDAO.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    return UserDAO.create({
      username,
      email,
      password: hashedPassword
    });
  }

  static async login(email, password) {
    const user = await UserDAO.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    return user;
  }
}

module.exports = AuthService;
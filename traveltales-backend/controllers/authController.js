const AuthService = require('../services/authService');
const TokenService = require('../services/tokenService');
const ApiKeyDAO = require('../dao/ApiKeyDAO');
const { validateRegisterInput, validateLoginInput } = require('../utils/validators');

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    
    const user = await AuthService.register({ username, email, password });
    
    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Add input validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    const user = await AuthService.login(email, password);
    const token = TokenService.generateToken(user.id);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.json({
      id: user.id,
      username: user.username,
      email: user.email
    });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    await ApiKeyDAO.deactivate(req.user.id);
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
};

const generateApiKey = async (req, res, next) => {
  try {
    const apiKey = await ApiKeyDAO.create(req.user.id);
    res.json({ apiKey: apiKey.api_key });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register: [validateRegisterInput, register],
  login: [validateLoginInput, login],
  logout,
  generateApiKey
};
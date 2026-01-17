const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const ApiKeyDAO = require('../dao/ApiKeyDAO');

dotenv.config();

const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  console.log('Auth middleware - token:', token);  // Add this
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const checkApiKeyStatus = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const apiKey = await ApiKeyDAO.findActiveByUserId(req.user.id);
    if (!apiKey) {
      return res.status(403).json({ message: 'No active API key found. Please generate one.' });
    }
    
    req.apiKey = apiKey;
    next();
  } catch (err) {
    console.error('API key status check error:', err);
    res.status(500).json({ message: 'Error checking API key status' });
  }
};

module.exports = {
  authenticate,
  checkApiKeyStatus
};
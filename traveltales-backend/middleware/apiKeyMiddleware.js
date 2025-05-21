const ApiKeyDAO = require('../dao/ApiKeyDAO');

const validateApiKey = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;
  
  if (!apiKey) {
    return res.status(401).json({ message: 'API key required' });
  }

  try {
    const validKey = await ApiKeyDAO.findByKey(apiKey);
    
    if (!validKey || !validKey.is_active) {
      return res.status(403).json({ message: 'Invalid or inactive API key' });
    }
    
    req.apiKeyUser = { id: validKey.user_id };
    next();
  } catch (err) {
    console.error('API key validation error:', err);
    res.status(500).json({ message: 'Error validating API key' });
  }
};

module.exports = validateApiKey;
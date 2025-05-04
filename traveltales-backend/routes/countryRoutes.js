const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');
const validateApiKey = require('../middleware/apiKeyMiddleware');

router.get('/', validateApiKey, countryController.getAllCountries);
router.get('/:name', validateApiKey, countryController.getCountryDetails);

module.exports = router;
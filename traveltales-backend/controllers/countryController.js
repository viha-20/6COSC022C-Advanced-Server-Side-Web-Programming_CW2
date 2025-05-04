const CountryService = require('../services/countryService');

const getAllCountries = async (req, res, next) => {
  try {
    const countries = await CountryService.getAllCountries();
    res.json(countries);
  } catch (err) {
    next(err);
  }
};

const getCountryDetails = async (req, res, next) => {
  try {
    const country = await CountryService.getCountryDetails(req.params.name);
    res.json(country);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCountries,
  getCountryDetails
};
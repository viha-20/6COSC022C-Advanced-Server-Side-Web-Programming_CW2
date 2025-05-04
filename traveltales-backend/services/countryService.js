const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

class CountryService {
  static async getAllCountries() {
    try {
      const response = await axios.get(`${process.env.COUNTRIES_API}/all`);
      return response.data.map(country => ({
        name: country.name.common,
        flag: country.flags.png,
        capital: country.capital ? country.capital[0] : 'N/A',
        currency: country.currencies ? Object.values(country.currencies)[0].name : 'N/A',
        currencySymbol: country.currencies ? Object.values(country.currencies)[0].symbol || 'N/A' : 'N/A'
      })).sort((a, b) => a.name.localeCompare(b.name));
    } catch (err) {
      console.error('Error fetching countries:', err);
      throw new Error('Failed to fetch countries');
    }
  }

  static async getCountryDetails(name) {
    try {
      const response = await axios.get(`${process.env.COUNTRIES_API}/name/${name}`);
      const country = response.data[0];
      
      return {
        name: country.name.common,
        officialName: country.name.official,
        flag: country.flags.png,
        capital: country.capital ? country.capital[0] : 'N/A',
        region: country.region,
        subregion: country.subregion,
        population: country.population,
        languages: country.languages ? Object.values(country.languages) : [],
        currency: country.currencies ? Object.values(country.currencies)[0].name : 'N/A',
        currencySymbol: country.currencies ? Object.values(country.currencies)[0].symbol || 'N/A' : 'N/A',
        timezones: country.timezones,
        borders: country.borders
      };
    } catch (err) {
      console.error('Error fetching country details:', err);
      throw new Error('Country not found');
    }
  }
}

module.exports = CountryService;
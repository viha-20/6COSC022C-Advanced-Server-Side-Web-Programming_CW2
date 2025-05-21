import api from './index';

export const getAllCountries = () => api.get('/countries');
export const getCountryDetails = (name) => api.get(`/countries/${name}`);


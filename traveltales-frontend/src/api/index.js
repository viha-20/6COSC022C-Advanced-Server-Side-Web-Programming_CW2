// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:3001/api',
//   withCredentials: true,
// });


// export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? '/api'  // When running in Docker (proxied by Nginx)
    : 'http://localhost:3001/api',  // For local development
  withCredentials: true,
});

export default api;
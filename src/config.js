const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    apiURL: '/',
    apiPort: process.env.PORT || 3000,
    dndBeyondURL: 'https://www.dndbeyond.com',
    siteURL: process.env.HOST || 'http://localhost',
  },
  production: {
    apiURL: 'https://dnd-dashboard-api.herokuapp.com',
    apiPort: process.env.PORT || 3000,
    dndBeyondURL: 'https://www.dndbeyond.com',
    siteURL: process.env.HOST || 'https://dnd.danielmconrad.com'
  }
};

module.exports = config[env];

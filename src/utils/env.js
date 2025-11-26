// Env variable loader and validation
require('dotenv').config();
const requiredVars = ['CODA_API_TOKEN', 'DB_URL', 'PORT'];
requiredVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required env var: ${key}`);
  }
});
module.exports = {
  CODA_API_TOKEN: process.env.CODA_API_TOKEN,
  POLL_INTERVAL: parseInt(process.env.POLL_INTERVAL || '10', 10),
  DB_URL: process.env.DB_URL,
  PORT: parseInt(process.env.PORT, 10)
};

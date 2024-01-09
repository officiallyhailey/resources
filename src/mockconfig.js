const dotenv = require("dotenv");
dotenv.config();
// Single source to handle all the env vars
module.exports = {
  host: process.env.MOCK_HOST,
  user: process.env.MOCK_USER,
  database: process.env.MOCK_DB_NAME,
  password: process.env.MOCK_PASSWORD,
  port: process.env.MOCK_PORT,
};

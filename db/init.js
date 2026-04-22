require("dotenv").config();
const { Client } = require("pg");
module.exports = new Client({
  connectionString: process.env.DB_URL,
});

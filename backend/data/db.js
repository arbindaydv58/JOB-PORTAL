// backend/data/db.js
const dotenv = require("dotenv");
dotenv.config();

// Import Pool from pg
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool
  .connect()
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(" Connection error", err.stack));

module.exports = pool;

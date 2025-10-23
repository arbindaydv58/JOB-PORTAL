// backend/data/db.js
const dotenv = require("dotenv");
dotenv.config();

// Import Pool from pg
const { Pool } = require("pg");

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD ,
//   port: process.env.DB_PORT,
// });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV ==='production' ? { rejectUnauthorized: false} : false,
});

pool
  .connect()
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(" Connection error", err.stack));

module.exports = pool;

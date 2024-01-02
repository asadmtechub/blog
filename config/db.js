const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_Password}@localhost:5432/${process.env.DB_NAME}`;

const db = new Client({
  connectionString: connectionString,
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected');
});

module.exports = db;

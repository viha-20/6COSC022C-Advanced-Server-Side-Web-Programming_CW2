const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const DB_PATH = path.join(__dirname, '../db', process.env.DB_NAME || 'travel_tales.db');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to SQLite database');
    db.get("PRAGMA foreign_keys = ON");
  }
});

// Enable WAL mode for better concurrency
db.run("PRAGMA journal_mode = WAL");

module.exports = db;
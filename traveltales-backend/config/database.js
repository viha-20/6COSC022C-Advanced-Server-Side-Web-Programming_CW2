// const sqlite3 = require('sqlite3').verbose();
// const path = require('path');
// const dotenv = require('dotenv');

// dotenv.config();

// const DB_PATH = path.join(__dirname, '../db', process.env.DB_NAME || 'travel_tales.db');

// const db = new sqlite3.Database(DB_PATH, (err) => {
//   if (err) {
//     console.error('Database connection error:', err.message);
//   } else {
//     console.log('Connected to SQLite database');
//     db.get("PRAGMA foreign_keys = ON");
//   }
// });

// // Enable WAL mode for better concurrency
// db.run("PRAGMA journal_mode = WAL");

// module.exports = db;




const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

// Determine correct database path
const dbDir = process.env.NODE_ENV === 'production' 
  ? '/data'  // Docker path
  : path.join(__dirname, '../db'); // Local development path

const dbFile = process.env.DB_NAME || 'travel_tales.db';
const DB_PATH = path.join(dbDir, dbFile);

// Ensure directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Initialize database with explicit permissions
const db = new sqlite3.Database(
  DB_PATH,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error('Database connection error:', err.message);
      console.error('Attempted path:', DB_PATH);
      process.exit(1);
    } else {
      console.log(`Connected to SQLite database at ${DB_PATH}`);
      db.run("PRAGMA foreign_keys = ON");
      db.run("PRAGMA journal_mode = WAL");
    }
  }
);

module.exports = db;
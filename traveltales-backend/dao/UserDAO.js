const db = require('../db/database');
const User = require('../models/User');

class UserDAO {
  static async create({ username, email, password }) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
        [username, email, password],
        function(err) {
          if (err) return reject(err);
          resolve(new User({
            id: this.lastID,
            username,
            email,
            password
          }));
        }
      );
    });
  }

  static async findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM users WHERE email = ?`,
        [email],
        (err, row) => {
          if (err) return reject(err);
          resolve(row ? new User(row) : null);
        }
      );
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM users WHERE id = ?`,
        [id],
        (err, row) => {
          if (err) return reject(err);
          resolve(row ? new User(row) : null);
        }
      );
    });
  }

  static async findByUsername(username) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM users WHERE username = ?`,
        [username],
        (err, row) => {
          if (err) return reject(err);
          resolve(row ? new User(row) : null);
        }
      );
    });
  }
}

module.exports = UserDAO;
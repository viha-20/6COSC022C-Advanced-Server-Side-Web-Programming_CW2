const db = require('../db/database');
const crypto = require('crypto');
const ApiKey = require('../models/ApiKey');

class ApiKeyDAO {
  static async create(userId) {
    return new Promise((resolve, reject) => {
      const apiKey = crypto.randomBytes(32).toString('hex');
      
      db.run(
        `INSERT INTO api_keys (user_id, api_key, is_active) 
         VALUES (?, ?, 1)
         ON CONFLICT(user_id) DO UPDATE SET 
           api_key = excluded.api_key,
           is_active = 1,
           updated_at = CURRENT_TIMESTAMP`,
        [userId, apiKey],
        function(err) {
          if (err) return reject(err);
          resolve(new ApiKey({
            id: this.lastID,
            user_id: userId,
            api_key: apiKey,
            is_active: 1
          }));
        }
      );
    });
  }

  static async deactivate(userId) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE api_keys 
         SET is_active = 0, api_key = NULL, updated_at = CURRENT_TIMESTAMP
         WHERE user_id = ?`,
        [userId],
        function(err) {
          if (err) return reject(err);
          resolve(this.changes > 0);
        }
      );
    });
  }

  static async findByKey(apiKey) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM api_keys WHERE api_key = ?`,
        [apiKey],
        (err, row) => {
          if (err) return reject(err);
          resolve(row ? new ApiKey(row) : null);
        }
      );
    });
  }

  static async findActiveByUserId(userId) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM api_keys WHERE user_id = ? AND is_active = 1`,
        [userId],
        (err, row) => {
          if (err) return reject(err);
          resolve(row ? new ApiKey(row) : null);
        }
      );
    });
  }
}

module.exports = ApiKeyDAO;
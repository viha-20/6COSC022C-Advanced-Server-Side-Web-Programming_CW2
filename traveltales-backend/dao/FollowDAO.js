const db = require('../db/database');
const Follow = require('../models/Follow');

class FollowDAO {
  static async create(follower_id, following_id) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO follows (follower_id, following_id) VALUES (?, ?)`,
        [follower_id, following_id],
        function(err) {
          if (err) return reject(err);
          resolve(new Follow({
            id: this.lastID,
            follower_id,
            following_id
          }));
        }
      );
    });
  }

  static async delete(follower_id, following_id) {
    return new Promise((resolve, reject) => {
      db.run(
        `DELETE FROM follows WHERE follower_id = ? AND following_id = ?`,
        [follower_id, following_id],
        function(err) {
          if (err) return reject(err);
          resolve(this.changes > 0);
        }
      );
    });
  }

  static async exists(follower_id, following_id) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT 1 FROM follows WHERE follower_id = ? AND following_id = ? LIMIT 1`,
        [follower_id, following_id],
        (err, row) => {
          if (err) return reject(err);
          resolve(!!row);
        }
      );
    });
  }

  static async getFollowers(user_id, { limit = 10, offset = 0 } = {}) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT u.id, u.username 
         FROM follows f
         JOIN users u ON f.follower_id = u.id
         WHERE f.following_id = ?
         ORDER BY f.created_at DESC
         LIMIT ? OFFSET ?`,
        [user_id, limit, offset],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  }

  static async getFollowing(user_id, { limit = 10, offset = 0 } = {}) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT u.id, u.username 
         FROM follows f
         JOIN users u ON f.following_id = u.id
         WHERE f.follower_id = ?
         ORDER BY f.created_at DESC
         LIMIT ? OFFSET ?`,
        [user_id, limit, offset],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  }

  static async getFollowersCount(user_id) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT COUNT(*) as count FROM follows WHERE following_id = ?`,
        [user_id],
        (err, row) => {
          if (err) return reject(err);
          resolve(row ? row.count : 0);
        }
      );
    });
  }

  static async getFollowingCount(user_id) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT COUNT(*) as count FROM follows WHERE follower_id = ?`,
        [user_id],
        (err, row) => {
          if (err) return reject(err);
          resolve(row ? row.count : 0);
        }
      );
    });
  }
}

module.exports = FollowDAO;
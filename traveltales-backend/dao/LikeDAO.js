const db = require('../db/database');
const Like = require('../models/Like');

class LikeDAO {
  static async create({ user_id, blog_post_id, is_like }) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO likes (user_id, blog_post_id, is_like) 
         VALUES (?, ?, ?)
         ON CONFLICT(user_id, blog_post_id) DO UPDATE SET 
           is_like = excluded.is_like,
           created_at = CURRENT_TIMESTAMP`,
        [user_id, blog_post_id, is_like ? 1 : 0],
        function(err) {
          if (err) return reject(err);
          resolve(new Like({
            id: this.lastID,
            user_id,
            blog_post_id,
            is_like: is_like ? 1 : 0
          }));
        }
      );
    });
  }

  static async delete({ user_id, blog_post_id }) {
    return new Promise((resolve, reject) => {
      db.run(
        `DELETE FROM likes WHERE user_id = ? AND blog_post_id = ?`,
        [user_id, blog_post_id],
        function(err) {
          if (err) return reject(err);
          resolve(this.changes > 0);
        }
      );
    });
  }

  static async getCounts(blog_post_id) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT 
           SUM(CASE WHEN is_like = 1 THEN 1 ELSE 0 END) as likes,
           SUM(CASE WHEN is_like = 0 THEN 1 ELSE 0 END) as dislikes
         FROM likes
         WHERE blog_post_id = ?`,
        [blog_post_id],
        (err, row) => {
          if (err) return reject(err);
          resolve({
            likes: row ? row.likes || 0 : 0,
            dislikes: row ? row.dislikes || 0 : 0
          });
        }
      );
    });
  }

  static async getUserLike(user_id, blog_post_id) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT is_like FROM likes WHERE user_id = ? AND blog_post_id = ?`,
        [user_id, blog_post_id],
        (err, row) => {
          if (err) return reject(err);
          resolve(row ? row.is_like : null);
        }
      );
    });
  }
}

module.exports = LikeDAO;
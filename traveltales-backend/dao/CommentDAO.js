const db = require('../db/database');
const Comment = require('../models/Comment');

class CommentDAO {
  static async create({ content, user_id, blog_post_id }) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO comments (content, user_id, blog_post_id) VALUES (?, ?, ?)`,
        [content, user_id, blog_post_id],
        function(err) {
          if (err) return reject(err);
          resolve(new Comment({
            id: this.lastID,
            content,
            user_id,
            blog_post_id
          }));
        }
      );
    });
  }

  static async findByPostId(blog_post_id, { limit = 10, offset = 0 } = {}) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT c.*, u.username 
         FROM comments c
         JOIN users u ON c.user_id = u.id
         WHERE c.blog_post_id = ?
         ORDER BY c.created_at DESC
         LIMIT ? OFFSET ?`,
        [blog_post_id, limit, offset],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows.map(row => new Comment(row)));
        }
      );
    });
  }

  static async countByPostId(blog_post_id) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT COUNT(*) as count FROM comments WHERE blog_post_id = ?`,
        [blog_post_id],
        (err, row) => {
          if (err) return reject(err);
          resolve(row ? row.count : 0);
        }
      );
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM comments WHERE id = ?`,
        [id],
        (err, row) => {
          if (err) return reject(err);
          resolve(row ? new Comment(row) : null);
        }
      );
    });
  }

  static async delete(id) {
    return new Promise((resolve, reject) => {
      db.run(
        `DELETE FROM comments WHERE id = ?`,
        [id],
        function(err) {
          if (err) return reject(err);
          resolve(this.changes > 0);
        }
      );
    });
  }
}

module.exports = CommentDAO;
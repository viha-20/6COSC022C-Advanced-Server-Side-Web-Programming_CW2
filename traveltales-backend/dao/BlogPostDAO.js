const db = require('../db/database');
const BlogPost = require('../models/BlogPost');

class BlogPostDAO {
  static async create({ title, content, country_name, date_of_visit, user_id }) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO blog_posts 
         (title, content, country_name, date_of_visit, user_id) 
         VALUES (?, ?, ?, ?, ?)`,
        [title, content, country_name, date_of_visit, user_id],
        function(err) {
          if (err) return reject(err);
          resolve(new BlogPost({
            id: this.lastID,
            title,
            content,
            country_name,
            date_of_visit,
            user_id
          }));
        }
      );
    });
  }


  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT bp.*, u.username 
         FROM blog_posts bp
         JOIN users u ON bp.user_id = u.id
         WHERE bp.id = ?`,
        [id],
        (err, row) => {
          if (err) return reject(err);
          resolve(row ? new BlogPost(row) : null);
        }
      );
    });
  }

  static async findByUserId(userId, { limit = 10, offset = 0 } = {}) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT bp.*, u.username 
         FROM blog_posts bp
         JOIN users u ON bp.user_id = u.id
         WHERE bp.user_id = ?
         ORDER BY bp.created_at DESC
         LIMIT ? OFFSET ?`,
        [userId, limit, offset],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows.map(row => new BlogPost(row)));
        }
      );
    });
  }

  static async findByCountry(countryName, { limit = 10, offset = 0 } = {}) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT bp.*, u.username 
         FROM blog_posts bp
         JOIN users u ON bp.user_id = u.id
         WHERE bp.country_name LIKE ?
         ORDER BY bp.created_at DESC
         LIMIT ? OFFSET ?`,
        [`%${countryName}%`, limit, offset],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows.map(row => new BlogPost(row)));
        }
      );
    });
  }

  static async findByUsername(username, { limit = 10, offset = 0 } = {}) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT bp.*, u.username 
         FROM blog_posts bp
         JOIN users u ON bp.user_id = u.id
         WHERE u.username LIKE ?
         ORDER BY bp.created_at DESC
         LIMIT ? OFFSET ?`,
        [`%${username}%`, limit, offset],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows.map(row => new BlogPost(row)));
        }
      );
    });
  }

  static async findAll({ sort = 'newest', limit = 10, offset = 0 } = {}) {
    let orderBy;
    switch (sort) {
      case 'most_liked':
        orderBy = `(
          SELECT COUNT(*) FROM likes l 
          WHERE l.blog_post_id = bp.id AND l.is_like = 1
        ) DESC`;
        break;
      case 'most_commented':
        orderBy = `(
          SELECT COUNT(*) FROM comments c 
          WHERE c.blog_post_id = bp.id
        ) DESC`;
        break;
      default:
        orderBy = 'bp.created_at DESC';
    }

    return new Promise((resolve, reject) => {
      db.all(
        `SELECT bp.*, u.username,
         (SELECT COUNT(*) FROM blog_posts) as total_count,
         (SELECT COUNT(*) FROM likes l WHERE l.blog_post_id = bp.id AND l.is_like = 1) as likes,
         (SELECT COUNT(*) FROM likes l WHERE l.blog_post_id = bp.id AND l.is_like = 0) as dislikes,
         (SELECT COUNT(*) FROM comments c WHERE c.blog_post_id = bp.id) as comments_count
         FROM blog_posts bp
         JOIN users u ON bp.user_id = u.id
         ORDER BY ${orderBy}
         LIMIT ? OFFSET ?`,
        [limit, offset],
        (err, rows) => {
          if (err) return reject(err);
          resolve({
            posts: rows.map(row => new BlogPost(row)),
            total: rows[0]?.total_count || 0
          });
        }
      );
    });
  }

  static async update(id, { title, content, country_name, date_of_visit }) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE blog_posts 
         SET title = ?, content = ?, country_name = ?, date_of_visit = ?, updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [title, content, country_name, date_of_visit, id],
        function(err) {
          if (err) return reject(err);
          resolve(this.changes > 0);
        }
      );
    });
  }

  static async delete(id) {
    return new Promise((resolve, reject) => {
      db.run(
        `DELETE FROM blog_posts WHERE id = ?`,
        [id],
        function(err) {
          if (err) return reject(err);
          resolve(this.changes > 0);
        }
      );
    });
  }

// // In BlogPostDAO.js
// static async getFeedForUser(userId, { limit = 10, offset = 0 } = {}) {
//   console.log('DAO - Fetching feed for user:', userId);  // Add this
//   return new Promise((resolve, reject) => {
//     db.all(
//       `SELECT bp.*, u.username 
//        FROM blog_posts bp
//        JOIN users u ON bp.user_id = u.id
//        JOIN follows f ON f.following_id = bp.user_id
//        WHERE f.follower_id = ?
//        ORDER BY bp.created_at DESC
//        LIMIT ? OFFSET ?`,
//       [userId, limit, offset],
//       (err, rows) => {
//         console.log('DAO - Query results:', {err, rows});  // Add this
//         if (err) return reject(err);
//         resolve(rows.map(row => new BlogPost(row)));
//       }
//     );
//   });
// }


static async getFeedForUser(userId, { limit = 10, offset = 0 } = {}) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT bp.*, u.username 
       FROM blog_posts bp
       JOIN users u ON bp.user_id = u.id
       JOIN follows f ON f.following_id = bp.user_id
       WHERE f.follower_id = ?
       ORDER BY bp.created_at DESC
       LIMIT ? OFFSET ?`,
      [userId, limit, offset],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows.map(row => new BlogPost(row)));
      }
    );
  });
}

  static async countByUserId(userId) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT COUNT(*) as count FROM blog_posts WHERE user_id = ?`,
        [userId],
        (err, row) => {
          if (err) return reject(err);
          resolve(row ? row.count : 0);
        }
      );
    });
  }
}

module.exports = BlogPostDAO;
class Comment {
    constructor({ id, content, user_id, blog_post_id, created_at, updated_at }) {
      this.id = id;
      this.content = content;
      this.user_id = user_id;
      this.blog_post_id = blog_post_id;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  }
  
  module.exports = Comment;
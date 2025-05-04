class Like {
    constructor({ id, user_id, blog_post_id, is_like, created_at }) {
      this.id = id;
      this.user_id = user_id;
      this.blog_post_id = blog_post_id;
      this.is_like = is_like;
      this.created_at = created_at;
    }
  }
  
  module.exports = Like;
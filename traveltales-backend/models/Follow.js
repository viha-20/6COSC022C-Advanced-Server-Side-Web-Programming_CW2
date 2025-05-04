class Follow {
    constructor({ id, follower_id, following_id, created_at }) {
      this.id = id;
      this.follower_id = follower_id;
      this.following_id = following_id;
      this.created_at = created_at;
    }
  }
  
  module.exports = Follow;
class BlogPost {
    constructor({ id, title, content, country_name, date_of_visit, user_id, created_at, updated_at }) {
      this.id = id;
      this.title = title;
      this.content = content;
      this.country_name = country_name;
      this.date_of_visit = date_of_visit;
      this.user_id = user_id;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  }
  
  module.exports = BlogPost;
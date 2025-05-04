class User {
    constructor({ id, username, email, password, created_at, updated_at }) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.password = password;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  }
  
  module.exports = User;
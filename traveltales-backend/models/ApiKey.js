class ApiKey {
    constructor({ id, user_id, api_key, is_active, created_at, updated_at }) {
      this.id = id;
      this.user_id = user_id;
      this.api_key = api_key;
      this.is_active = is_active;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  }
  
  module.exports = ApiKey;
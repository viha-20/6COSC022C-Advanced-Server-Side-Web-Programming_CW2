function paginate(data, page = 1, limit = 10) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const results = {};
    results.total = data.length;
    results.page = page;
    results.limit = limit;
    results.totalPages = Math.ceil(data.length / limit);
    
    results.results = data.slice(startIndex, endIndex);
    return results;
  }
  
  module.exports = {
    paginate
  };
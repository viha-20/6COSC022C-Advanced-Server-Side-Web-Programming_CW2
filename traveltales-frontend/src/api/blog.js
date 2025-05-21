import { data } from 'react-router';
import api from './index';

// export const getBlogPosts = () => api.get('/blogs');

export const getBlogPosts = (sort) => {
  const params = {};
  if (sort) {
    params.sort = sort;
  }
  return api.get('/blogs', { params });
};

export const getBlogPostById = (id) => api.get(`/blogs/${id}`);
export const createBlogPost = (postData) => api.post('/blogs', postData);
export const updateBlogPost = (id, postData) => api.put(`/blogs/${id}`, postData);
// export const deleteBlogPost = (id) => api.delete(`/blogs/${id}`);

export const deleteBlogPost = (id, apiKey) => 
  api.delete(`/blogs/${id}`, {
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json'
    }
  });


// export const likeBlogPost = (id) => api.post(`/blogs/${id}/like`);
// export const unlikeBlogPost = (id) => api.delete(`/blogs/${id}/like`);


// export const likeBlogPost = (id, isLike) => api.post(`/blogs/${id}/like`, { isLike });
// export const unlikeBlogPost = (id) => api.delete(`/blogs/${id}/like`);

export const likeBlogPost = (id, data) => 
  api.post(`/blogs/${id}/like`, data , {
    headers: {
      'Content-Type': 'application/json'
    }
  });

export const unlikeBlogPost = (id) => 
  api.delete(`/blogs/${id}/like`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

// export const addComment = (id, comment) => api.post(`/blogs/${id}/comments`, { comment });
// export const deleteComment = (id, commentId) => api.delete(`/blogs/${id}/comments/${commentId}`);


// In your blog API file
export const addComment = (id, commentData) => 
  api.post(`/blogs/${id}/comments`, commentData, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

export const deleteComment = (id, commentId) => 
  api.delete(`/blogs/${id}/comments/${commentId}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });


// export const searchBlogPosts = (query) => api.get('/blogs/search', { params: { query } });

// In api/blog.js
export const searchBlogPosts = (params) => {
  // Convert params object to URL query string
  const queryString = new URLSearchParams(params).toString();
  return api.get(`/blogs/search?${queryString}`);
};
// export const getUserFeed = () => api.get('/blogs/feed');

export const getUserFeed = () => 
  api.get('/blogs/feed', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
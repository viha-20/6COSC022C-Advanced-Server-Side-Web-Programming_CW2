import api from './index';

export const getBlogPosts = () => api.get('/blogs');
export const getBlogPostById = (id) => api.get(`/blogs/${id}`);
export const createBlogPost = (postData) => api.post('/blogs', postData);
export const updateBlogPost = (id, postData) => api.put(`/blogs/${id}`, postData);
export const deleteBlogPost = (id) => api.delete(`/blogs/${id}`);
export const likeBlogPost = (id) => api.post(`/blogs/${id}/like`);
export const unlikeBlogPost = (id) => api.delete(`/blogs/${id}/like`);
export const addComment = (id, comment) => api.post(`/blogs/${id}/comments`, { comment });
export const deleteComment = (id, commentId) => api.delete(`/blogs/${id}/comments/${commentId}`);
export const searchBlogPosts = (query) => api.get('/blogs/search', { params: { query } });
export const getUserFeed = () => api.get('/blogs/feed');
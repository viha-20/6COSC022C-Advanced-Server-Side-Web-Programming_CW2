import api from './index';

export const getUserProfile = (id) => api.get(`/users/${id}`);
export const followUser = (id) => api.post(`/users/${id}/follow`);
export const unfollowUser = (id) => api.delete(`/users/${id}/follow`);
export const getFollowers = (id, page = 1, limit = 10) => 
  api.get(`/users/${id}/followers`, { params: { page, limit } });
export const getFollowing = (id, page = 1, limit = 10) => 
  api.get(`/users/${id}/following`, { params: { page, limit } });
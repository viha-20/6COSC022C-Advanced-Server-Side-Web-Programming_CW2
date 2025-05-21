import { createContext, useContext, useState } from 'react';
import { 
  getBlogPosts, 
  getBlogPostById, 
  createBlogPost as apiCreateBlogPost,
  updateBlogPost as apiUpdateBlogPost,
  deleteBlogPost as apiDeleteBlogPost,
  likeBlogPost as apiLikeBlogPost,
  unlikeBlogPost as apiUnlikeBlogPost,
  addComment as apiAddComment,
  deleteComment as apiDeleteComment,
  searchBlogPosts as apiSearchBlogPosts,
  getUserFeed as apiGetUserFeed
} from '../api/blog';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchBlogs = async (sort = 'newest') => {
    setLoading(true);
    try {
      const response = await getBlogPosts(sort);
      console.log("API Response:", response.data);
      
      if (response.data && response.data.success) {
        setBlogs(response.data.data || []);
      } else {
        setBlogs([]);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch blogs');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogById = async (id) => {
    setLoading(true);
    try {
      const response = await getBlogPostById(id);
      setCurrentBlog(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createBlogPost = async (postData) => {
    setLoading(true);
    try {
      const response = await apiCreateBlogPost(postData);
      if (response.data && response.data.success) {
        setBlogs([response.data.data, ...blogs]);
        return response.data;
      } else {
        
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create blog post');
      throw err;
    } finally {
      setLoading(false);
    }
  };

 const updateBlogPost = async (id, postData, apiKey) => {
    setLoading(true);
    try {
      const response = await apiUpdateBlogPost(id, postData, apiKey);
      setBlogs(blogs.map(blog => blog.id === id ? response.data : blog));
      if (currentBlog && currentBlog.id === id) {
        setCurrentBlog(response.data);
      }
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update blog post');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteBlogPost = async (id, apiKey) => {
    setLoading(true);
    try {
      await apiDeleteBlogPost(id, apiKey);
      setBlogs(blogs.filter(blog => blog.id !== id));
      if (currentBlog && currentBlog.id === id) {
        setCurrentBlog(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to delete blog post');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const likeBlogPost = async (id, isLike) => {
    try {
      const data = { isLike: isLike };
      const response = await apiLikeBlogPost(id, data);
      
      setBlogs(blogs.map(blog => {
        if (blog.id === id) {
          return { 
            ...blog,
            likes_count: response.data.likes_count,
            dislikes_count: response.data.dislikes_count,
            reactions: response.data.reactions || blog.reactions
          };
        }
        return blog;
      }));

      if (currentBlog?.id === id) {
        setCurrentBlog({
          ...currentBlog,
          likes_count: response.data.likes_count,
          dislikes_count: response.data.dislikes_count,
          reactions: response.data.reactions || currentBlog.reactions
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update reaction');
      throw err;
    }
  };

  const unlikeBlogPost = async (id) => {
    try {
      const response = await apiUnlikeBlogPost(id);
      
      setBlogs(blogs.map(blog => {
        if (blog.id === id) {
          return { 
            ...blog,
            likes_count: response.data.likes_count,
            dislikes_count: response.data.dislikes_count,
            reactions: response.data.reactions || blog.reactions
          };
        }
        return blog;
      }));

      if (currentBlog?.id === id) {
        setCurrentBlog({
          ...currentBlog,
          likes_count: response.data.likes_count,
          dislikes_count: response.data.dislikes_count,
          reactions: response.data.reactions || currentBlog.reactions
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to remove reaction');
      throw err;
    }
  };

  const addComment = async (id, comment) => {
    try {
      const response = await apiAddComment(id, { content: comment });
      setBlogs(blogs.map(blog => 
        blog.id === id ? { 
          ...blog, 
          comments: [...(blog.comments || []), response.data],
          commentsCount: (blog.commentsCount || blog.comments?.length || 0) + 1
        } : blog
      ));
      if (currentBlog && currentBlog.id === id) {
        setCurrentBlog({ 
          ...currentBlog, 
          comments: [...(currentBlog.comments || []), response.data],
          commentsCount: (currentBlog.commentsCount || currentBlog.comments?.length || 0) + 1
        });
      }
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to add comment');
      throw err;
    }
  };

  const deleteComment = async (id, commentId) => {
    try {
      await apiDeleteComment(id, commentId);
      setBlogs(blogs.map(blog => 
        blog.id === id ? { 
          ...blog, 
          comments: (blog.comments || []).filter(c => c.id !== commentId),
          commentsCount: Math.max((blog.commentsCount || blog.comments?.length || 1) - 1, 0)
        } : blog
      ));
      if (currentBlog && currentBlog.id === id) {
        setCurrentBlog({ 
          ...currentBlog, 
          comments: (currentBlog.comments || []).filter(c => c.id !== commentId),
          commentsCount: Math.max((currentBlog.commentsCount || currentBlog.comments?.length || 1) - 1, 0)
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to delete comment');
      throw err;
    }
  };

  const searchBlogPosts = async (params) => {
    setLoading(true);
    try {
      console.log("Search params:", params);
      const response = await apiSearchBlogPosts(params);
      console.log("Search response:", response);
      
      if (response.data && response.data.success) {
        setBlogs(response.data.data || []);
      } else {
        setBlogs([]);
      }
      return response.data;
    } catch (err) {
      console.error("Search error details:", {
        message: err.message,
        response: err.response?.data,
        config: err.config
      });
      setError(err.response?.data?.message || err.message || 'Failed to search blog posts');
      setBlogs([]);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchUserFeed = async () => {
    setLoading(true);
    try {
      const response = await apiGetUserFeed();
      if (response.data && response.data.success) {
        setBlogs(response.data.data || []);
      } else {
        setBlogs([]);
      }
    } catch (err) {
      console.error("Error fetching user feed:", err);
      setError(err.response?.data?.message || err.message || 'Failed to load feed');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BlogContext.Provider value={{
      blogs,
      currentBlog,
      loading,
      error,
      fetchBlogs,
      fetchBlogById,
      createBlogPost,
      updateBlogPost,
      deleteBlogPost,
      likeBlogPost,
      unlikeBlogPost,
      addComment,
      deleteComment,
      searchBlogPosts,
      fetchUserFeed
    }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);

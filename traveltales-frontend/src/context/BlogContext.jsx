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
import { data } from 'react-router-dom';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const fetchBlogs = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await getBlogPosts();
  //     // setBlogs(response.data?.data?.posts);
  //     console.log("Testing Data ",response.data);
  //     setBlogs(response.data);
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const fetchBlogs = async () => {
  setLoading(true);
  try {
    const response = await getBlogPosts();
    console.log("API Response:", response.data);
    
    // Handle the backend response structure
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

  // const createBlogPost = async (postData) => {
  //   setLoading(true);
  //   try {
  //     const response = await apiCreateBlogPost(postData);
  //     setBlogs([response.data, ...blogs]);
  //     return response.data;
  //   } catch (err) {
  //     setError(err.message);
  //     throw err;
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const createBlogPost = async (postData) => {
  setLoading(true);
  try {
    const response = await apiCreateBlogPost(postData);
    if (response.data && response.data.success) {
      setBlogs([response.data.data, ...blogs]);
      return response.data;
    } else {
      throw new Error(response.data?.message || 'Failed to create blog post');
    }
  } catch (err) {
    setError(err.response?.data?.message || err.message || 'Failed to create blog post');
    throw err;
  } finally {
    setLoading(false);
  }
};
  const updateBlogPost = async (id, postData) => {
    setLoading(true);
    try {
      const response = await apiUpdateBlogPost(id, postData);
      setBlogs(blogs.map(blog => blog.id === id ? response.data : blog));
      if (currentBlog && currentBlog.id === id) {
        setCurrentBlog(response.data);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteBlogPost = async (id) => {
    setLoading(true);
    try {
      await apiDeleteBlogPost(id);
      setBlogs(blogs.filter(blog => blog.id !== id));
      if (currentBlog && currentBlog.id === id) {
        setCurrentBlog(null);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const likeBlogPost = async (id) => {
    try {
      await apiLikeBlogPost(id);
      setBlogs(blogs.map(blog => 
        blog.id === id ? { ...blog, likes: (blog.likes || 0) + 1 } : blog
      ));
      if (currentBlog && currentBlog.id === id) {
        setCurrentBlog({ ...currentBlog, likes: (currentBlog.likes || 0) + 1 });
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const unlikeBlogPost = async (id) => {
    try {
      await apiUnlikeBlogPost(id);
      setBlogs(blogs.map(blog => 
        blog.id === id ? { ...blog, likes: Math.max(0, (blog.likes || 0) - 1) } : blog
      ));
      if (currentBlog && currentBlog.id === id) {
        setCurrentBlog({ ...currentBlog, likes: Math.max(0, (currentBlog.likes || 0) - 1) });
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const addComment = async (id, comment) => {
    try {
      const response = await apiAddComment(id, comment);
      setBlogs(blogs.map(blog => 
        blog.id === id ? { ...blog, comments: [...(blog.comments || []), response.data] } : blog
      ));
      if (currentBlog && currentBlog.id === id) {
        setCurrentBlog({ 
          ...currentBlog, 
          comments: [...(currentBlog.comments || []), response.data] 
        });
      }
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteComment = async (id, commentId) => {
    try {
      await apiDeleteComment(id, commentId);
      setBlogs(blogs.map(blog => 
        blog.id === id ? { 
          ...blog, 
          comments: (blog.comments || []).filter(c => c.id !== commentId) 
        } : blog
      ));
      if (currentBlog && currentBlog.id === id) {
        setCurrentBlog({ 
          ...currentBlog, 
          comments: (currentBlog.comments || []).filter(c => c.id !== commentId) 
        });
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const searchBlogPosts = async (query) => {
    setLoading(true);
    try {
      const response = await apiSearchBlogPosts(query);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchUserFeed = async () => {
    setLoading(true);
    try {
      const response = await apiGetUserFeed();
      setBlogs(response.data);
    } catch (err) {
      setError(err.message);
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
const BlogPostDAO = require('../dao/BlogPostDAO');
const LikeDAO = require('../dao/LikeDAO');
const CommentDAO = require('../dao/commentDAO');
const { paginate } = require('../utils/helpers');
const { validateBlogPostInput } = require('../utils/validators');

// Public endpoints
// const getBlogPosts = async (req, res, next) => {
//   try {
//     const { page = 1, limit = 10, sort = 'newest' } = req.query;
//     const posts = await BlogPostDAO.findAll({ sort, limit, offset: (page - 1) * limit });
//     res.json(paginate(posts, parseInt(page), parseInt(limit)));
//   } catch (err) {
//     next(err);
//   }
// };

const getBlogPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort = 'newest' } = req.query;
    const posts = await BlogPostDAO.findAll({ 
      sort, 
      limit, 
      offset: (page - 1) * limit 
    });

    res.json({
      success: true,
      data: posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: posts.length // Note: For accurate totals, you might need a COUNT query
      }
    });
  } catch (err) {
    next(err);
  }
};

// const getBlogPostById = async (req, res, next) => {
//   try {
//     const post = await BlogPostDAO.findById(req.params.id);
//     if (!post) {
//       return res.status(404).json({ message: 'Yes Blog post not found' });
//     }
    
//     const [likes, comments] = await Promise.all([
//       LikeDAO.getCounts(post.id),
//       CommentDAO.countByPostId(post.id)
//     ]);
    
//     res.json({
//       ...post,
//       likes: likes.likes || 0,
//       dislikes: likes.dislikes || 0,
//       commentsCount: comments || 0
//     });
//   } catch (err) {
//     next(err);
//   }
// };

const getBlogPostById = async (req, res, next) => {
  try {
    const post = await BlogPostDAO.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    const [likes, comments, commentList] = await Promise.all([
      LikeDAO.getCounts(post.id),
      CommentDAO.countByPostId(post.id),
      CommentDAO.findByPostId(post.id) // Add this line
    ]);
    
    res.json({
      ...post,
      likes: likes.likes || 0,
      dislikes: likes.dislikes || 0,
      commentsCount: comments || 0,
      comments: commentList || [] // Add comments array
    });
  } catch (err) {
    next(err);
  }
};

// Authenticated endpoints
const createBlogPost = async (req, res, next) => {
  try {
    const { title, content, country_name, date_of_visit } = req.body;
    const post = await BlogPostDAO.create({
      title,
      content,
      country_name,
      date_of_visit,
      user_id: req.user.id
    });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

const updateBlogPost = async (req, res, next) => {
  try {
    const { title, content, country_name, date_of_visit } = req.body;
    const postId = req.params.id;
    
    // Verify post belongs to user
    const post = await BlogPostDAO.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    if (post.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }
    
    const updated = await BlogPostDAO.update(postId, { title, content, country_name, date_of_visit });
    if (!updated) {
      return res.status(400).json({ message: 'Failed to update post' });
    }
    
    res.json({ message: 'Post updated successfully' });
  } catch (err) {
    next(err);
  }
};

const deleteBlogPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    
    // Verify post belongs to user
    const post = await BlogPostDAO.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    if (post.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }
    
    const deleted = await BlogPostDAO.delete(postId);
    if (!deleted) {
      return res.status(400).json({ message: 'Failed to delete post' });
    }
    
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// const searchBlogPosts = async (req, res, next) => {
//   try {
//     const { country, username, page = 1, limit = 10 } = req.query;
    
//     if (country) {
//       const posts = await BlogPostDAO.findByCountry(country, { limit, offset: (page - 1) * limit });
//       res.json(paginate(posts, parseInt(page), parseInt(limit)));
//     } else if (username) {
//       const posts = await BlogPostDAO.findByUsername(username, { limit, offset: (page - 1) * limit });
//       res.json(paginate(posts, parseInt(page), parseInt(limit)));
//     } else {
//       res.status(400).json({ message: 'Please provide country or username to search' });
//     }
//   } catch (err) {
//     next(err);
//   }
// };


const searchBlogPosts = async (req, res, next) => {
  try {
    const { country, username, page = 1, limit = 10 } = req.query;
    
    // Verify at least one search parameter exists
    if (!country && !username) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide country or username to search' 
      });
    }

    let posts;
    if (country) {
      posts = await BlogPostDAO.findByCountry(country, { 
        limit, 
        offset: (page - 1) * limit 
      });
    } else {
      posts = await BlogPostDAO.findByUsername(username, { 
        limit, 
        offset: (page - 1) * limit 
      });
    }

    // Add likes/comments counts to each post
    const postsWithMetrics = await Promise.all(
      posts.map(async post => {
        const [likes, comments] = await Promise.all([
          LikeDAO.getCounts(post.id),
          CommentDAO.countByPostId(post.id)
        ]);
        
        return {
          ...post,
          likes: likes.likes || 0,
          dislikes: likes.dislikes || 0,
          commentsCount: comments || 0
        };
      })
    );

    res.json({
      success: true,
      data: postsWithMetrics,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: postsWithMetrics.length
      }
    });
    
  } catch (err) {
    next(err);
  }
};

// const getUserFeed = async (req, res, next) => {
//   try {
//     const { page = 1, limit = 10 } = req.query;
//     console.log(`User ${req.user.id} is fetching feed`);
//     const posts = await BlogPostDAO.getFeedForUser(req.user.id, { limit, offset: (page - 1) * limit });
//     console.log('Found posts:', posts);
//     res.json(paginate(posts, parseInt(page), parseInt(limit)));
//   } catch (err) {
//     next(err);
//   }
// };

const getUserFeed = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    // Get posts from users that the current user follows
    const posts = await BlogPostDAO.getFeedForUser(req.user.id, { limit, offset });
    
    // Handle empty feed case
    if (!posts || posts.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No posts from users you follow yet",
        data: [],
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: 0
        }
      });
    }

    // Get additional metrics for posts that exist
    const postsWithMetrics = await Promise.all(
      posts.map(async post => {
        const [likes, comments] = await Promise.all([
          LikeDAO.getCounts(post.id),
          CommentDAO.countByPostId(post.id)
        ]);
        
        return {
          ...post,
          likes: likes.likes || 0,
          dislikes: likes.dislikes || 0,
          commentsCount: comments || 0
        };
      })
    );

    res.json({
      success: true,
      data: postsWithMetrics,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: postsWithMetrics.length
      }
    });
  } catch (err) {
    next(err);
  }
};

const likeBlogPost = async (req, res, next) => {
  try {
    const { isLike } = req.body;
    const blogPostId = req.params.id;
    
    await LikeDAO.create({
      user_id: req.user.id,
      blog_post_id: blogPostId,
      is_like: isLike
    });
    
    res.json({ message: isLike ? 'Post liked' : 'Post disliked' });
  } catch (err) {
    next(err);
  }
};

const unlikeBlogPost = async (req, res, next) => {
  try {
    const blogPostId = req.params.id;
    
    await LikeDAO.delete({
      user_id: req.user.id,
      blog_post_id: blogPostId
    });
    
    res.json({ message: 'Post unliked' });
  } catch (err) {
    next(err);
  }
};

const addComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const blogPostId = req.params.id;
    
    const comment = await CommentDAO.create({
      content,
      user_id: req.user.id,
      blog_post_id: blogPostId
    });
    
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    
    // Verify comment belongs to user
    const comment = await CommentDAO.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    if (comment.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }
    
    await CommentDAO.delete(commentId);
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getBlogPosts,
  getBlogPostById,
  createBlogPost: [validateBlogPostInput, createBlogPost],
  updateBlogPost: [validateBlogPostInput, updateBlogPost],
  deleteBlogPost,
  searchBlogPosts,
  getUserFeed,
  likeBlogPost,
  unlikeBlogPost,
  addComment,
  deleteComment
};
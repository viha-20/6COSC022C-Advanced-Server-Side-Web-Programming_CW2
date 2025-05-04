const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { authenticate, checkApiKeyStatus } = require('../middleware/authMiddleware');
const validateApiKey = require('../middleware/apiKeyMiddleware');

// Debug the router initialization
console.log('Blog routes initialized');

// Public routes
router.get('/', blogController.getBlogPosts);
router.get('/search',authenticate, blogController.searchBlogPosts);

// Authenticated routes
router.get('/feed', authenticate, blogController.getUserFeed);

// public route
router.get('/:id', blogController.getBlogPostById);

// Authenticated routes
router.post('/', authenticate, blogController.createBlogPost); 
router.post('/:id/like', authenticate, blogController.likeBlogPost);
router.delete('/:id/like', authenticate, blogController.unlikeBlogPost);
router.post('/:id/comments', authenticate, blogController.addComment);
router.delete('/:id/comments/:commentId', authenticate, blogController.deleteComment);

// API key protected routes
router.put('/:id', [authenticate, validateApiKey], blogController.updateBlogPost);
router.delete('/:id', [authenticate, validateApiKey], blogController.deleteBlogPost);



module.exports = router;
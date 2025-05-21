import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  IconButton, 
  Avatar,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAuth } from '../../context/AuthContext';
import { useBlog } from '../../context/BlogContext';
import { formatDate } from '../../utils/helpers';
import EditIcon from '@mui/icons-material/Edit';

const BlogCard = ({ blog, onDelete }) => {
  const { user, apiKey } = useAuth();
  const { deleteBlogPost, likeBlogPost, unlikeBlogPost } = useBlog();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const open = Boolean(anchorEl);


  // In BlogCard component
const userLike = blog.reactions?.find(reaction => reaction.user_id === user?.id);
const isLiked = userLike?.is_like === true;
const isDisliked = userLike?.is_like === false;

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteBlogPost(blog.id, apiKey);
      setSnackbar({
        open: true,
        message: 'Blog post deleted successfully',
        severity: 'success'
      });
      if (onDelete) {
        onDelete(blog.id);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      setSnackbar({
        open: true,
        message: 'Failed to delete blog post',
        severity: 'error'
      });
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

const handleLike = async () => {
  if (!user) return;
  try {
    if (isLiked) {
      await unlikeBlogPost(blog.id);
    } else {
      await likeBlogPost(blog.id, true); // true means like
    }
  } catch (error) {
    console.error("Error handling like:", error);
    setSnackbar({
      open: true,
      message: 'Failed to update reaction',
      severity: 'error'
    });
  }
};

const handleDislike = async () => {
  if (!user) return;
  try {
    // if (isDisliked) {
    //   await unlikeBlogPost(blog.id);
    // } else {
    //   await likeBlogPost(blog.id, false); // false means dislike
    // }
    await likeBlogPost(blog.id, false); // false means dislike
  } catch (error) {
    console.error("Error handling dislike:", error);
    setSnackbar({
      open: true,
      message: 'Failed to update reaction',
      severity: 'error'
    });
  }
};

  return (
    <>
      <Card sx={{ 
        mb: 3, 
        borderRadius: 2,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 3
      }}>
        {/* Flag background with overlay */}
        <Box sx={{
          height: 200,
          backgroundImage: 'linear-gradient(135deg,rgb(144, 71, 197) 0%,rgb(83, 136, 216) 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)'
          }
        }}>
          {/* Country name displayed on the flag background */}
          <Typography
            variant="h5"
            sx={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              color: 'white',
              fontWeight: 'bold',
              textShadow: '1px 1px 3px rgba(0,0,0,0.8)',
              fontSize: '1.5rem',
              fontStyle: 'italic'
            }}
          >
            {blog.country_name || blog.country || 'Travel Destination'}
          </Typography>

          {/* Menu button for post owner */}
          {user?.id === blog.user_id && (
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleMenuClick}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'white',
                backgroundColor: 'rgba(0,0,0,0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.5)'
                }
              }}
            >
              <MoreVertIcon />
            </IconButton>
          )}
        </Box>

        {/* Dropdown menu for post actions */}
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleMenuClose}
          PaperProps={{
            style: {
              width: '20ch',
            },
          }}
        >
          <MenuItem 
            component={Link}
            to={`/edit-blog/${blog.id}`}
            onClick={handleMenuClose}
          >
            <EditIcon sx={{ mr: 1 }} /> Edit
          </MenuItem>
          <MenuItem onClick={handleDeleteClick}>Delete Post</MenuItem>
        </Menu>

        <CardContent>
          {/* User info and metadata */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar 
              src={blog.user?.avatar || '/default-avatar.jpg'} 
              alt={blog.username.toUpperCase()} 
              sx={{ width: 32, height: 32, mr: 1,backgroundColor: '#262529' }}
              component={Link}
              to={`/profile/${blog.user_id}`}
            />
            <Typography 
              variant="subtitle2" 
              component={Link} 
              to={`/profile/${blog.user_id}`}
              sx={{ 
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': { color: '#6a0dad' }
              }}
            >
              {blog.username}
            </Typography>
            <Typography variant="caption" sx={{ ml: 'auto', color: 'text.secondary' }}>
              {formatDate(blog.created_at)}
            </Typography>
          </Box>
          
          {/* Blog title */}
          <Typography 
            variant="h6" 
            component={Link} 
            to={`/blogs/${blog.id}`} 
            sx={{ 
              textDecoration: 'none', 
              color: 'inherit',
              display: 'block',
              mb: 1,
              '&:hover': { color: '#6a0dad' }
            }}
          >
            {blog.title}
          </Typography>
          
          {/* Blog content preview */}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
            {blog.content.substring(0, 300)}...
          </Typography>
          
          {/* Reaction buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Like button */}
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <IconButton 
                onClick={handleLike} 
                disabled={!user || isDisliked}
                size="small"
                color={isLiked ? 'error' : 'default'}
              >
                {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
              <Typography variant="body2">
                {blog.likes || 0}
              </Typography>
            </Box>

            {/* Dislike button */}
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <IconButton 
                onClick={handleDislike} 
                disabled={!user || isLiked}
                size="small"
                color={isDisliked ? 'error' : 'default'}
              >
                {isDisliked ? <ThumbDownIcon /> : <ThumbDownOffAltIcon />}
              </IconButton>
              <Typography variant="body2">
                {blog.dislikes || 0}
              </Typography>
            </Box>

            {/* Comment button */}
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton component={Link} to={`/blogs/${blog.id}`} size="small">
              <ChatBubbleOutlineIcon />
            </IconButton>
            <Typography variant="body2">
              {blog.commentsCount || blog.comments?.length || 0}
            </Typography>
          </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Delete confirmation dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Post?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this post? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default BlogCard;
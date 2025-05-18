import { useEffect } from 'react'; // Add this import
import { useParams } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import { Avatar, Box, Typography, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentForm from './CommentForm';
import Comment from './Comment';
import { formatDate } from '../../utils/helpers';
import { useAuth } from '../../context/AuthContext';

const BlogDetail = () => {
  const { id } = useParams();
  const { currentBlog, fetchBlogById, likeBlogPost, unlikeBlogPost } = useBlog();
  const { user } = useAuth();

  useEffect(() => {
    fetchBlogById(id);
  }, [id, fetchBlogById]);

  if (!currentBlog) {
    return <div>Loading...</div>;
  }

  const isLiked = currentBlog.likes && currentBlog.likes.some(like => like.user_id === user?.id);

  const handleLike = async () => {
    if (!user) return;
    if (isLiked) {
      await unlikeBlogPost(currentBlog.id);
    } else {
      await likeBlogPost(currentBlog.id);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Card sx={{ mb: 3 }}>
        <CardMedia
          component="img"
          height="400"
          image={currentBlog.image_url || '/default-blog.jpg'}
          alt={currentBlog.title}
        />
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar 
              src="/default-avatar.jpg" 
              alt={currentBlog.user?.username} 
              sx={{ width: 32, height: 32, mr: 1 }}
            />
            <Typography variant="subtitle2">
              {currentBlog.user?.username}
            </Typography>
            <Typography variant="caption" sx={{ ml: 'auto', color: 'text.secondary' }}>
              {formatDate(currentBlog.created_at)}
            </Typography>
          </Box>
          
          <Typography variant="h4" gutterBottom>
            {currentBlog.title}
          </Typography>
          
          <Typography variant="body1" paragraph>
            {currentBlog.content}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <IconButton onClick={handleLike} disabled={!user}>
              {isLiked ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
            <Typography variant="body2" sx={{ mr: 2 }}>
              {currentBlog.likes?.length || 0} likes
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Typography variant="h6" sx={{ mb: 2, color: '#6a0dad' }}>
        Comments ({currentBlog.comments?.length || 0})
      </Typography>

      {user && <CommentForm blogId={currentBlog.id} />}

      <Box sx={{ mt: 3 }}>
        {currentBlog.comments?.length > 0 ? (
          currentBlog.comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
            No comments yet. Be the first to comment!
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default BlogDetail;
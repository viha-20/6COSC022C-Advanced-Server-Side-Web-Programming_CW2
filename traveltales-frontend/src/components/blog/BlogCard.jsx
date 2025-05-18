// import { Link } from 'react-router-dom';
// import { Card, CardContent, CardMedia, Typography, Box, IconButton, Avatar } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import { useAuth } from '../../context/AuthContext';
// import { useBlog } from '../../context/BlogContext';
// import { formatDate } from '../../utils/helpers';

// const BlogCard = ({ blog }) => {
//   const { user } = useAuth();
//   const { likeBlogPost, unlikeBlogPost } = useBlog();
//   const isLiked = blog.likes && blog.likes.some(like => like.user_id === user?.id);

//   const handleLike = async () => {
//     if (!user) return;
//     if (isLiked) {
//       await unlikeBlogPost(blog.id);
//     } else {
//       await likeBlogPost(blog.id);
//     }
//   };

//   return (
//     <Card sx={{ mb: 3, borderRadius: 2 }}>
//       <CardMedia
//         component="img"
//         height="200"
//         image={blog.image_url || '/default-blog.jpg'}
//         alt={blog.title}
//       />
//       <CardContent>
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//           <Avatar 
//             src="/default-avatar.jpg" 
//             alt={blog.user?.username} 
//             sx={{ width: 32, height: 32, mr: 1 }}
//           />
//           <Typography variant="subtitle2" component={Link} to={`/profile/${blog.user_id}`}>
//             {blog.user?.username}
//           </Typography>
//           <Typography variant="caption" sx={{ ml: 'auto', color: 'text.secondary' }}>
//             {formatDate(blog.created_at)}
//           </Typography>
//         </Box>
        
//         <Typography variant="h6" component={Link} to={`/blogs/${blog.id}`} sx={{ 
//           textDecoration: 'none', 
//           color: 'inherit',
//           '&:hover': {
//             color: '#6a0dad'
//           }
//         }}>
//           {blog.title}
//         </Typography>
        
//         <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//           {blog.content.substring(0, 100)}...
//         </Typography>
        
//         <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
//           <IconButton onClick={handleLike} disabled={!user}>
//             {isLiked ? (
//               <FavoriteIcon color="error" />
//             ) : (
//               <FavoriteBorderIcon />
//             )}
//           </IconButton>
//           <Typography variant="body2" sx={{ mr: 2 }}>
//             {blog.likes_count || 0}
//           </Typography>
          
//           <IconButton component={Link} to={`/blogs/${blog.id}`}>
//             <ChatBubbleOutlineIcon />
//           </IconButton>
//           <Typography variant="body2">
//             {blog.comments_count || 0}
//           </Typography>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default BlogCard;



import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Box, IconButton, Avatar } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useAuth } from '../../context/AuthContext';
import { useBlog } from '../../context/BlogContext';
import { formatDate } from '../../utils/helpers';

const BlogCard = ({ blog }) => {
  const { user } = useAuth();
  const { likeBlogPost, unlikeBlogPost } = useBlog();
  const isLiked = blog.likes && blog.likes.some(like => like.user_id === user?.id);

  const handleLike = async () => {
    if (!user) return;
    if (isLiked) {
      await unlikeBlogPost(blog.id);
    } else {
      await likeBlogPost(blog.id);
    }
  };

  return (
    <Card sx={{ mb: 3, borderRadius: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={blog.image_url || '/default-blog.jpg'}
        alt={blog.title}
      />
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar 
            src={blog.user?.avatar || '/default-avatar.jpg'} 
            alt={blog.user?.username} 
            sx={{ width: 32, height: 32, mr: 1 }}
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
              '&:hover': {
                color: '#6a0dad'
              }
            }}
          >
            {blog.user?.username}
          </Typography>
          {blog.country && (
            <Box sx={{ ml: 1 }}>
              <img 
                src={`https://flagcdn.com/w20/${blog.country_code.toLowerCase()}.png`} 
                alt={blog.country} 
                style={{ width: '20px', height: '15px' }} 
                title={blog.country}
              />
            </Box>
          )}
          <Typography variant="caption" sx={{ ml: 'auto', color: 'text.secondary' }}>
            {formatDate(blog.created_at)}
          </Typography>
        </Box>
        
        <Typography variant="h6" component={Link} to={`/blogs/${blog.id}`} sx={{ 
          textDecoration: 'none', 
          color: 'inherit',
          '&:hover': {
            color: '#6a0dad'
          }
        }}>
          {blog.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {blog.content.substring(0, 100)}...
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
            {blog.likes_count || 0}
          </Typography>
          
          <IconButton component={Link} to={`/blogs/${blog.id}`}>
            <ChatBubbleOutlineIcon />
          </IconButton>
          <Typography variant="body2">
            {blog.comments_count || 0}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
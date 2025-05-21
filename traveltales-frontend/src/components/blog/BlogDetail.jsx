// import { useEffect } from 'react'; // Add this import
// import { useParams } from 'react-router-dom';
// import { useBlog } from '../../context/BlogContext';
// import { Avatar, Box, Typography, Card, CardContent, CardMedia, IconButton } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import CommentForm from './CommentForm';
// import Comment from './Comment';
// import { formatDate } from '../../utils/helpers';
// import { useAuth } from '../../context/AuthContext';

// const BlogDetail = () => {
//   const { id } = useParams();
//   const { currentBlog, fetchBlogById, likeBlogPost, unlikeBlogPost } = useBlog();
//   const { user } = useAuth();

//   useEffect(() => {
//     fetchBlogById(id);
//   }, [id, fetchBlogById]);

//   if (!currentBlog) {
//     return <div>Loading...</div>;
//   }

//   const isLiked = currentBlog.likes && currentBlog.likes.some(like => like.user_id === user?.id);

//   const handleLike = async () => {
//     if (!user) return;
//     if (isLiked) {
//       await unlikeBlogPost(currentBlog.id);
//     } else {
//       await likeBlogPost(currentBlog.id);
//     }
//   };
  

//   return (
//     <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
//       <Card sx={{ mb: 3 }}>
//         <CardMedia
//           component="img"
//           height="400"
//           image={currentBlog.image_url || '/default-blog.jpg'}
//           alt={currentBlog.title}
//         />
//         <CardContent>
//           <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//             <Avatar 
//               src="/default-avatar.jpg" 
//               alt={currentBlog.user?.username} 
//               sx={{ width: 32, height: 32, mr: 1 }}
//             />
//             <Typography variant="subtitle2">
//               {currentBlog.user?.username}
//             </Typography>
//             <Typography variant="caption" sx={{ ml: 'auto', color: 'text.secondary' }}>
//               {formatDate(currentBlog.created_at)}
//             </Typography>
//           </Box>
          
//           <Typography variant="h4" gutterBottom>
//             {currentBlog.title}
//           </Typography>
          
//           <Typography variant="body1" paragraph>
//             {currentBlog.content}
//           </Typography>
          
//           <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
//             <IconButton onClick={handleLike} disabled={!user}>
//               {isLiked ? (
//                 <FavoriteIcon color="error" />
//               ) : (
//                 <FavoriteBorderIcon />
//               )}
//             </IconButton>
//             <Typography variant="body2" sx={{ mr: 2 }}>
//               {currentBlog.likes?.length || 0} likes
//             </Typography>
//           </Box>
//         </CardContent>
//       </Card>

//       <Typography variant="h6" sx={{ mb: 2, color: '#6a0dad' }}>
//         Comments ({currentBlog.comments?.length || 0})
//       </Typography>

//       {user && <CommentForm blogId={currentBlog.id} />}

//       <Box sx={{ mt: 3 }}>
//         {currentBlog.comments?.length > 0 ? (
//           currentBlog.comments.map(comment => (
//             <Comment key={comment.id} comment={comment} />
//           ))
//         ) : (
//           <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
//             No comments yet. Be the first to comment!
//           </Typography>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default BlogDetail;



// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useBlog } from '../../context/BlogContext';
// import { 
//   Avatar, 
//   Box, 
//   Typography, 
//   Card, 
//   CardContent, 
//   CardMedia, 
//   IconButton,
//   Divider,
//   CircularProgress
// } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import CommentForm from './CommentForm';
// import Comment from './Comment';
// import { formatDate } from '../../utils/helpers';
// import { useAuth } from '../../context/AuthContext';

// const BlogDetail = () => {
//   const { id } = useParams();
//   const { 
//     currentBlog, 
//     fetchBlogById, 
//     likeBlogPost, 
//     unlikeBlogPost,
//     addComment,
//     deleteComment,
//     loading
//   } = useBlog();
//   const { user } = useAuth();

//   useEffect(() => {
//     fetchBlogById(id);
//   }, [id, ]);

//   if (loading || !currentBlog) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   // Check if user has liked the post
//   // Updated to handle both array and object formats for likes
// // Updated isLiked check in BlogDetail.js
//     const isLiked = currentBlog.reactions?.some(reaction => 
//     reaction.user_id === user?.id && reaction.is_like === true
//     ) || false;

//   const handleLike = async () => {
//     if (!user) return;
//     try {
//       if (isLiked) {
//         await unlikeBlogPost(currentBlog.id);
//       } else {
//         await likeBlogPost(currentBlog.id, true);
//       }
//     } catch (err) {
//       console.error('Error handling like:', err);
//     }
//   };

//   const handleAddComment = async (comment) => {
//     try {
//       await addComment(currentBlog.id, comment);
//     } catch (err) {
//       console.error('Failed to add comment:', err);
//       throw err;
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     try {
//       await deleteComment(currentBlog.id, commentId);
//     } catch (err) {
//       console.error('Failed to delete comment:', err);
//       throw err;
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
//       <Card sx={{ mb: 3 }}>
//         <CardMedia
//           component="img"
//           height="400"
//           image={currentBlog.image_url || '/default-blog.jpg'}
//           alt={currentBlog.title}
//         />
//         <CardContent>
//           <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//             <Avatar 
//               src={currentBlog.user?.avatar || '/default-avatar.jpg'} 
//               alt={currentBlog.user?.username} 
//               sx={{ width: 32, height: 32, mr: 1 }}
//             />
//             <Typography variant="subtitle2">
//               {currentBlog.user?.username}
//             </Typography>
//             <Typography variant="caption" sx={{ ml: 'auto', color: 'text.secondary' }}>
//               {formatDate(currentBlog.created_at)}
//             </Typography>
//           </Box>
          
//           <Typography variant="h4" gutterBottom>
//             {currentBlog.title}
//           </Typography>
          
//           <Typography variant="body1" paragraph>
//             {currentBlog.content}
//           </Typography>
          
//           <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
//             <IconButton onClick={handleLike} disabled={!user}>
//               {isLiked ? (
//                 <FavoriteIcon color="error" />
//               ) : (
//                 <FavoriteBorderIcon />
//               )}
//             </IconButton>
//             <Typography variant="body2" sx={{ mr: 2 }}>
//               {currentBlog.likes_count || currentBlog.likes || 0} likes
//             </Typography>
//             <Typography variant="body2">
//               {currentBlog.commentsCount || currentBlog.comments?.length || 0} comments
//             </Typography>
//           </Box>
//         </CardContent>
//       </Card>

//       <Typography variant="h6" sx={{ mb: 2, color: '#6a0dad' }}>
//         Comments ({currentBlog.commentsCount || currentBlog.comments?.length || 0})
//       </Typography>

//       {user && <CommentForm blogId={currentBlog.id} onSubmit={handleAddComment} />}

//       <Divider sx={{ my: 3 }} />

//       <Box sx={{ mt: 3 }}>
//         {currentBlog.comments?.length > 0 ? (
//           currentBlog.comments.map(comment => (
//             <Comment 
//               key={comment.id} 
//               comment={comment} 
//               onDelete={handleDeleteComment}
//             />
//           ))
//         ) : (
//           <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
//             No comments yet. Be the first to comment!
//           </Typography>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default BlogDetail;


// Final Edited All before add background image

// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useBlog } from '../../context/BlogContext';
// import { 
//   Avatar, 
//   Box, 
//   Typography, 
//   Card, 
//   CardContent, 
//   CardMedia, 
//   IconButton,
//   Divider,
//   CircularProgress
// } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import CommentForm from './CommentForm';
// import Comment from './Comment';
// import { formatDate } from '../../utils/helpers';
// import { useAuth } from '../../context/AuthContext';


// const BlogDetail = () => {
//   const { id } = useParams();
//   const { 
//     currentBlog, 
//     fetchBlogById, 
//     likeBlogPost, 
//     unlikeBlogPost,
//     addComment,
//     deleteComment,
//     loading
//   } = useBlog();
//   const { user } = useAuth();

//   useEffect(() => {
//     fetchBlogById(id);
//   }, [id]);

//   if (loading || !currentBlog) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   // Check if user has liked the post
//   const isLiked = currentBlog.reactions?.some(reaction => 
//     reaction.user_id === user?.id && reaction.is_like === true
//   ) || false;

//   const handleLike = async () => {
//     if (!user) return;
//     try {
//       if (isLiked) {
//         await unlikeBlogPost(currentBlog.id);
//       } else {
//         await likeBlogPost(currentBlog.id, true);
//       }
//     } catch (err) {
//       console.error('Error handling like:', err);
//     }
//   };

//   const handleAddComment = async (comment) => {
//     try {
//       await addComment(currentBlog.id, comment);
//     } catch (err) {
//       console.error('Failed to add comment:', err);
//       throw err;
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     try {
//       await deleteComment(currentBlog.id, commentId);
//     } catch (err) {
//       console.error('Failed to delete comment:', err);
//       throw err;
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
//       <Card sx={{ mb: 3 }}>
//         <CardMedia
//           component="img"
//           height="400"
//           image={currentBlog.image_url || '/default-blog.jpg'}
//           alt={currentBlog.title}
//         />
//         <CardContent>
//           <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//             <Avatar 
//               src={currentBlog.user?.avatar || '/default-avatar.jpg'} 
//               alt={currentBlog.user?.username} 
//               sx={{ width: 32, height: 32, mr: 1 }}
//             />
//             <Typography variant="subtitle2">
//               {currentBlog.user?.username}
//             </Typography>
//             <Typography variant="caption" sx={{ ml: 'auto', color: 'text.secondary' }}>
//               {formatDate(currentBlog.created_at)}
//             </Typography>
//           </Box>
          
//           <Typography variant="h4" gutterBottom>
//             {currentBlog.title}
//           </Typography>
          
//           <Typography variant="body1" paragraph>
//             {currentBlog.content}
//           </Typography>
          
//           <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
//             <IconButton onClick={handleLike} disabled={!user}>
//               {isLiked ? (
//                 <FavoriteIcon color="error" />
//               ) : (
//                 <FavoriteBorderIcon />
//               )}
//             </IconButton>
//             <Typography variant="body2" sx={{ mr: 2 }}>
//               {currentBlog.likes || 0} likes
//             </Typography>
//             <Typography variant="body2">
//               {currentBlog.commentsCount || currentBlog.comments?.length || 0} comments
//             </Typography>
//           </Box>
//         </CardContent>
//       </Card>

//       <Typography variant="h6" sx={{ mb: 2, color: '#6a0dad' }}>
//         Comments ({currentBlog.commentsCount || currentBlog.comments?.length || 0})
//       </Typography>

//       {user && <CommentForm blogId={currentBlog.id} onSubmit={handleAddComment} />}

//       <Divider sx={{ my: 3 }} />

//       <Box sx={{ mt: 3 }}>
//         {currentBlog.comments?.length > 0 ? (
//           currentBlog.comments.map(comment => (
//             <Comment 
//               key={comment.id} 
//               comment={comment} 
//               onDelete={handleDeleteComment}
//             />
//           ))
//         ) : (
//           <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
//             No comments yet. Be the first to comment!
//           </Typography>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default BlogDetail;




import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import { 
  Avatar, 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  IconButton,
  Divider,
  CircularProgress
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentForm from './CommentForm';
import Comment from './Comment';
import { formatDate } from '../../utils/helpers';
import { useAuth } from '../../context/AuthContext';

const BlogDetail = () => {
  const { id } = useParams();
  const { 
    currentBlog, 
    fetchBlogById, 
    likeBlogPost, 
    unlikeBlogPost,
    addComment,
    deleteComment,
    loading
  } = useBlog();
  const { user } = useAuth();

  useEffect(() => {
    fetchBlogById(id);
  }, [id]);

  if (loading || !currentBlog) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Check if user has liked the post
  const isLiked = currentBlog.reactions?.some(reaction => 
    reaction.user_id === user?.id && reaction.is_like === true
  ) || false;


  const handleLike = async () => {
    if (!user) return;
    try {
      if (isLiked) {
        await unlikeBlogPost(currentBlog.id);
      } else {
        await likeBlogPost(currentBlog.id, true);
      }
    } catch (err) {
      console.error('Error handling like:', err);
    }
  };

  const handleAddComment = async (comment) => {
    try {
      await addComment(currentBlog.id, comment);
    } catch (err) {
      console.error('Failed to add comment:', err);
      throw err;
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(currentBlog.id, commentId);
    } catch (err) {
      console.error('Failed to delete comment:', err);
      throw err;
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Card sx={{ mb: 3 }}>
        {/* Flag background with overlay */}
        <Box sx={{
          height: 400,
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
            variant="h3"
            sx={{
              position: 'absolute',
              bottom: 24,
              left: 24,
              color: 'white',
              fontWeight: 'bold',
              textShadow: '1px 1px 3px rgba(0,0,0,0.8)',
              fontSize: '2.5rem'
            }}
          >
            {currentBlog.country_name || currentBlog.country || 'Travel Destination'}
          </Typography>
        </Box>

        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar 
              src={currentBlog.user?.avatar || '/default-avatar.jpg'} 
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
              {currentBlog.likes_count || 0} likes
            </Typography>
            <Typography variant="body2">
              {currentBlog.commentsCount || currentBlog.comments?.length || 0} comments
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Typography variant="h6" sx={{ mb: 2, color: '#6a0dad' }}>
        Comments ({currentBlog.commentsCount || currentBlog.comments?.length || 0})
      </Typography>

      {user && <CommentForm blogId={currentBlog.id} onSubmit={handleAddComment} />}

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mt: 3 }}>
        {currentBlog.comments?.length > 0 ? (
          currentBlog.comments.map(comment => (
            <Comment 
              key={comment.id} 
              comment={comment} 
              onDelete={handleDeleteComment}
            />
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
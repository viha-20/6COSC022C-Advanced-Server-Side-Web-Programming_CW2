// import { useState } from 'react';
// import { useBlog } from '../../context/BlogContext';
// import { TextField, Button, Box } from '@mui/material';

// const CommentForm = ({ blogId }) => {
//   const [comment, setComment] = useState('');
//   const { addComment } = useBlog();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!comment.trim()) return;
    
//     try {
//       await addComment(blogId, comment);
//       setComment('');
//     } catch (err) {
//       console.error('Failed to add comment:', err);
//     }
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
//       <TextField
//         fullWidth
//         multiline
//         rows={3}
//         variant="outlined"
//         placeholder="Add a comment..."
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//       />
//       <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
//         <Button
//           type="submit"
//           variant="contained"
//           sx={{ 
//             backgroundColor: '#6a0dad',
//             '&:hover': {
//               backgroundColor: '#5a0ba5'
//             }
//           }}
//         >
//           Post Comment
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default CommentForm;



import { useState } from 'react';
import { TextField, Button, Box, CircularProgress } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const CommentForm = ({ blogId, onSubmit }) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim() || !user) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(comment);
      setComment('');
    } catch (err) {
      console.error('Failed to add comment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <TextField
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={isSubmitting}
      />
      <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          variant="contained"
          disabled={!comment.trim() || isSubmitting}
          sx={{ 
            backgroundColor: '#6a0dad',
            '&:hover': {
              backgroundColor: '#5a0ba5'
            }
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Post Comment'
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default CommentForm;
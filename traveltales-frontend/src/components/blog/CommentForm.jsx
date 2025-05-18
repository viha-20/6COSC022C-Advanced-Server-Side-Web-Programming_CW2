import { useState } from 'react';
import { useBlog } from '../../context/BlogContext';
import { TextField, Button, Box } from '@mui/material';

const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState('');
  const { addComment } = useBlog();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    try {
      await addComment(blogId, comment);
      setComment('');
    } catch (err) {
      console.error('Failed to add comment:', err);
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
      />
      <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          variant="contained"
          sx={{ 
            backgroundColor: '#6a0dad',
            '&:hover': {
              backgroundColor: '#5a0ba5'
            }
          }}
        >
          Post Comment
        </Button>
      </Box>
    </Box>
  );
};

export default CommentForm;
import { Avatar, Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../../context/AuthContext';
import { formatDate } from '../../utils/helpers';

const Comment = ({ comment, onDelete }) => {
  const { user } = useAuth();
  const canDelete = user && (user.id === comment.user_id || user.role === 'admin');

  return (
    <Box sx={{ display: 'flex', mb: 2 }}>
      <Avatar 
        src="/default-avatar.jpg" 
        alt={comment.user?.username} 
        sx={{ width: 32, height: 32, mr: 2 }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
            {comment.user?.username}
          </Typography>
          <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
            {formatDate(comment.created_at)}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mt: 0.5 }}>
          {comment.content}
        </Typography>
      </Box>
      {canDelete && (
        <IconButton onClick={() => onDelete(comment.id)} size="small">
          <DeleteIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};

export default Comment;
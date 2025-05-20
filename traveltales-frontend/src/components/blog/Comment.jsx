// import { Avatar, Box, Typography, IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useAuth } from '../../context/AuthContext';
// import { formatDate } from '../../utils/helpers';

// const Comment = ({ comment, onDelete }) => {
//   const { user } = useAuth();
//   const canDelete = user && (user.id === comment.user_id || user.role === 'admin');

//   return (
//     <Box sx={{ display: 'flex', mb: 2 }}>
//       <Avatar 
//         src="/default-avatar.jpg" 
//         alt={comment.user?.username} 
//         sx={{ width: 32, height: 32, mr: 2 }}
//       />
//       <Box sx={{ flexGrow: 1 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
//             {comment.user?.username}
//           </Typography>
//           <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
//             {formatDate(comment.created_at)}
//           </Typography>
//         </Box>
//         <Typography variant="body1" sx={{ mt: 0.5 }}>
//           {comment.content}
//         </Typography>
//       </Box>
//       {canDelete && (
//         <IconButton onClick={() => onDelete(comment.id)} size="small">
//           <DeleteIcon fontSize="small" />
//         </IconButton>
//       )}
//     </Box>
//   );
// };

// export default Comment;



import { Avatar, Box, Typography, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../../context/AuthContext';
import { formatDate } from '../../utils/helpers';

const Comment = ({ comment, onDelete }) => {
  const { user } = useAuth();
  const canDelete = user && (user.id === comment.user?.id || user.role === 'admin');

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      onDelete(comment.id);
    }
  };

  return (
    <Box sx={{ display: 'flex', mb: 3, alignItems: 'flex-start' }}>
      <Avatar 
        src={comment.user?.avatar || '/default-avatar.jpg'} 
        alt={comment.user?.username} 
        sx={{ width: 40, height: 40, mr: 2 }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mr: 1 }}>
            {comment.user?.username}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {formatDate(comment.createdAt || comment.created_at)}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}>
          {comment.content}
        </Typography>
      </Box>
      {canDelete && (
        <Tooltip title="Delete comment">
          <IconButton onClick={handleDelete} size="small" color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default Comment;
import { Box, Typography } from '@mui/material';
import UserCard from './UserCard';

const UserList = ({ users, title }) => {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, color: '#6a0dad' }}>
        {title}
      </Typography>
      {users.length > 0 ? (
        users.map(user => (
          <UserCard key={user.id} user={user} />
        ))
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
          No users found
        </Typography>
      )}
    </Box>
  );
};

export default UserList;
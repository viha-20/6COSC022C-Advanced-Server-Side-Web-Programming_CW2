// ProfileFollowersPage.jsx
import { useEffect } from 'react'; // Add this import
import { useParams } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { getFollowers } from '../../api/user';
import UserList from '../../components/user/UserList';
import { Box, Typography } from '@mui/material';

const ProfileFollowersPage = () => {
  const { id } = useParams();
  const { data: followers, loading, error, request } = useApi();

  useEffect(() => {
    request(() => getFollowers(id));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <UserList 
        users={followers || []} 
        title="Followers" 
      />
    </Box>
  );
};

export default ProfileFollowersPage;
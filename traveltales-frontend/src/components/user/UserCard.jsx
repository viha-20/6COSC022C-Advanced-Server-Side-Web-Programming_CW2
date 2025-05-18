import { Avatar, Box, Typography, Button, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { followUser, unfollowUser } from '../../api/user';

const UserCard = ({ user }) => {
  const { user: currentUser } = useAuth();
  const [isFollowing, setIsFollowing] = useState(user.is_following);
  const isCurrentUser = currentUser && currentUser.id === user.id;

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(user.id);
        setIsFollowing(false);
      } else {
        await followUser(user.id);
        setIsFollowing(true);
      }
    } catch (err) {
      console.error('Follow/unfollow error:', err);
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            src="/default-avatar.jpg" 
            alt={user.username} 
            sx={{ width: 56, height: 56, mr: 2 }}
            component={Link}
            to={`/profile/${user.id}`}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography 
              variant="h6" 
              component={Link} 
              to={`/profile/${user.id}`}
              sx={{ 
                textDecoration: 'none', 
                color: 'inherit',
                '&:hover': {
                  color: '#6a0dad'
                }
              }}
            >
              {user.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.posts_count || 0} posts
            </Typography>
          </Box>
          {!isCurrentUser && currentUser && (
            <Button
              variant={isFollowing ? 'outlined' : 'contained'}
              onClick={handleFollow}
              sx={{ 
                backgroundColor: isFollowing ? 'transparent' : '#6a0dad',
                color: isFollowing ? '#6a0dad' : 'white',
                borderColor: '#6a0dad',
                '&:hover': {
                  backgroundColor: isFollowing ? '#f5f5f5' : '#5a0ba5'
                }
              }}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;
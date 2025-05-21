import { Avatar, Box, Typography, Button } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { followUser, unfollowUser } from '../../api/user';
import { use, useState,useEffect } from 'react';

const ProfileCard = ({ profile, isCurrentUser }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(profile.is_following);
  const [followersCount, setFollowersCount] = useState(profile.followers_count || 0);
  useEffect(() => {
    console.log("profile : ",profile);
  },[])
  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(profile.id);
        setIsFollowing(false);
        setFollowersCount(prev => prev - 1);
      } else {
        await followUser(profile.id);
        setIsFollowing(true);
        setFollowersCount(prev => prev + 1);
      }
      console.log(profile.id);
    } catch (err) {
      console.error('Follow/unfollow error:', err);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      p: 3, 
      borderBottom: '1px solid #e0e0e0',
      backgroundColor: '#bea6de',
      borderRadius: 2,
      mb: 3,
      mt: 5,
    }}>
      <Avatar 
        src="/default-avatar.jpg" 
        alt={profile.username.toUpperCase()} 
        sx={{ width: 100, height: 100, mb: 2,backgroundColor: '#262529' }}
      />
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        {profile.username}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Joined {new Date(profile.createdAt).toLocaleDateString()}
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6">{profile.postsCount || 0}</Typography>
          <Typography variant="body2">Posts</Typography>
        </Box>
        <Box 
          sx={{ 
            textAlign: 'center', 
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
          onClick={() => navigate(`/profile/${profile.id}/followers`)}
        >
          <Typography variant="h6">{profile.followersCount}</Typography>
          <Typography variant="body2">Followers</Typography>
        </Box>
        <Box 
          sx={{ 
            textAlign: 'center', 
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
          onClick={() => navigate(`/profile/${profile.id}/following`)}
        >
          <Typography variant="h6">{profile.followingCount || 0}</Typography>
          <Typography variant="body2">Following</Typography>
        </Box>
      </Box>
      
      {!isCurrentUser && user && (
        <Button
          variant="contained"
          onClick={handleFollow}
          sx={{ 
            backgroundColor: isFollowing ? '#e0e0e0' : '#6a0dad',
            color: isFollowing ? '#000' : '#fff',
            '&:hover': {
              backgroundColor: isFollowing ? '#d0d0d0' : '#5a0ba5'
            }
          }}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </Button>
      )}
    </Box>
  );
};

export default ProfileCard;
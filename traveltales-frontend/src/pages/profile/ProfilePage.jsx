import { useEffect } from 'react'; // Add this import
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getUserProfile } from '../../api/user';
import { useBlog } from '../../context/BlogContext';
import ProfileCard from '../../components/user/ProfileCard';
import BlogCard from '../../components/blog/BlogCard';
import { Box, Typography, Container } from '@mui/material';
import { useState } from 'react';

const ProfilePage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { blogs, fetchBlogs } = useBlog();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileResponse = await getUserProfile(id);
        setProfile(profileResponse.data);
        
        // Fetch user's blogs
        await fetchBlogs({ userId: id });
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadProfile();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Profile not found</div>;
  }

  const isCurrentUser = user && user.id === parseInt(id);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <ProfileCard profile={profile} isCurrentUser={isCurrentUser} />
        
        <Typography variant="h5" sx={{ mt: 4, mb: 2, color: '#6a0dad' }}>
          {isCurrentUser ? 'Your Posts' : `${profile.username}'s Posts`}
        </Typography>
        
        {blogs.length > 0 ? (
          blogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
            {isCurrentUser ? 'You have no posts yet. Create your first post!' : 'This user has no posts yet.'}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ProfilePage;
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getUserProfile } from '../../api/user';
import { useBlog } from '../../context/BlogContext';
import ProfileCard from '../../components/user/ProfileCard';
import BlogCard from '../../components/blog/BlogCard';
import { Box, Typography, Container } from '@mui/material';

const ProfilePage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { blogs, fetchBlogs } = useBlog();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userBlogs, setUserBlogs] = useState([]); // Add state for filtered blogs

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileResponse = await getUserProfile(id);
        console.log('Profile API Response:', profileResponse.data);
        
        setProfile({
          ...profileResponse.data,
          followers_count: profileResponse.data.followers_count || profileResponse.data.followers?.length || 0,
          following_count: profileResponse.data.following_count || profileResponse.data.following?.length || 0,
          followers: profileResponse.data.followers || [],
          following: profileResponse.data.following || []
        });
        
        // Fetch blogs and filter by user ID
        await fetchBlogs({ userId: id });
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadProfile();
  }, [id]);

  // Filter blogs by user ID whenever blogs change
  useEffect(() => {
    if (blogs && id) {
      const filtered = blogs.filter(blog => blog.user_id === parseInt(id));
      setUserBlogs(filtered);
    }
  }, [blogs, id]);

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Profile not found</div>;

  const isCurrentUser = user && user.id === parseInt(id);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <ProfileCard profile={profile} isCurrentUser={isCurrentUser} />
        
        <Typography variant="h5" sx={{ mt: 4, mb: 2, color: '#6a0dad' }}>
          {isCurrentUser ? 'Your Posts' : `${profile.username}'s Posts`}
        </Typography>
        
        {userBlogs.length > 0 ? (
          userBlogs.map(blog => (
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
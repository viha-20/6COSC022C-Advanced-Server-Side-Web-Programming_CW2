// import { useEffect } from 'react'; // Add this import
// import { useParams } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { getUserProfile } from '../../api/user';
// import { useBlog } from '../../context/BlogContext';
// import ProfileCard from '../../components/user/ProfileCard';
// import BlogCard from '../../components/blog/BlogCard';
// import { Box, Typography, Container } from '@mui/material';
// import { useState } from 'react';

// const ProfilePage = () => {
//   const { id } = useParams();
//   const { user } = useAuth();
//   const { blogs, fetchBlogs } = useBlog();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         const profileResponse = await getUserProfile(id);
//         setProfile(profileResponse.data);
        
//         // Fetch user's blogs
//         await fetchBlogs({ userId: id });
//       } catch (err) {
//         console.error('Failed to load profile:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     loadProfile();
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!profile) {
//     return <div>Profile not found</div>;
//   }

//   const isCurrentUser = user && user.id === parseInt(id);

//   return (
//     <Container maxWidth="md">
//       <Box sx={{ my: 4 }}>
//         <ProfileCard profile={profile} isCurrentUser={isCurrentUser} />
        
//         <Typography variant="h5" sx={{ mt: 4, mb: 2, color: '#6a0dad' }}>
//           {isCurrentUser ? 'Your Posts' : `${profile.username}'s Posts`}
//         </Typography>
        
//         {blogs.length > 0 ? (
//           blogs.map(blog => (
//             <BlogCard key={blog.id} blog={blog} />
//           ))
//         ) : (
//           <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
//             {isCurrentUser ? 'You have no posts yet. Create your first post!' : 'This user has no posts yet.'}
//           </Typography>
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default ProfilePage;


// Under code is before change the feed of users|| other users blog posts also showing here 

// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { getUserProfile } from '../../api/user';
// import { useBlog } from '../../context/BlogContext';
// import ProfileCard from '../../components/user/ProfileCard';
// import BlogCard from '../../components/blog/BlogCard';
// import { Box, Typography, Container } from '@mui/material';

// const ProfilePage = () => {
//   const { id } = useParams();
//   const { user } = useAuth();
//   const { blogs, fetchBlogs } = useBlog();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         const profileResponse = await getUserProfile(id);
//         console.log('Profile API Response:', profileResponse.data); // Debug log
        
//         setProfile({
//           ...profileResponse.data,
//           // Ensure we have counts from both direct properties and arrays
//           followers_count: profileResponse.data.followers_count || profileResponse.data.followers?.length || 0,
//           following_count: profileResponse.data.following_count || profileResponse.data.following?.length || 0,
//           // Keep the full arrays for follow status checking
//           followers: profileResponse.data.followers || [],
//           following: profileResponse.data.following || []
//         });
        
//         await fetchBlogs({ userId: id });
//       } catch (err) {
//         console.error('Failed to load profile:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     loadProfile();
//   }, [id]);

//   if (loading) return <div>Loading...</div>;
//   if (!profile) return <div>Profile not found</div>;

//   const isCurrentUser = user && user.id === parseInt(id);

//   return (
//     <Container maxWidth="md">
//       <Box sx={{ my: 4 }}>
//         <ProfileCard profile={profile} isCurrentUser={isCurrentUser} />
        
//         <Typography variant="h5" sx={{ mt: 4, mb: 2, color: '#6a0dad' }}>
//           {isCurrentUser ? 'Your Posts' : `${profile.username}'s Posts`}
//         </Typography>
        
//         {blogs.length > 0 ? (
//           blogs.map(blog => (
//             <BlogCard key={blog.id} blog={blog} />
//           ))
//         ) : (
//           <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
//             {isCurrentUser ? 'You have no posts yet. Create your first post!' : 'This user has no posts yet.'}
//           </Typography>
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default ProfilePage;


// Below code is After successfully done the blog posts only in their own profiles

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
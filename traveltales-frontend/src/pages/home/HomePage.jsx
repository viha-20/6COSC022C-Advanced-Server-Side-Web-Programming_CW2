// import { useEffect } from 'react'; // Add this import
// import { Box, Typography } from '@mui/material';
// import { useBlog } from '../../context/BlogContext';
// import BlogCard from '../../components/blog/BlogCard';

// const HomePage = () => {
//   const { blogs, fetchBlogs } = useBlog();

//   useEffect(() => {
//     fetchBlogs();
//   }, []);
//   useEffect(() => { console.log(blogs)
//     },[]);

//   return (
//     <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
//       <Typography variant="h4" gutterBottom sx={{ color: '#6a0dad' }}>
//         Recent Travel Stories
//       </Typography>
      
//       {blogs.length > 0 ? (
//         blogs.map(blog => (
//           <BlogCard key={blog.id} blog={blog} />
//         ))
//       ) : (
//         <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
//           No blog posts found. Be the first to share your travel story!
//         </Typography>
//       )}
//     </Box>
//   );
// };

// export default HomePage;


// import { useEffect } from 'react';
// import { Box, Typography, CircularProgress } from '@mui/material';
// import { useBlog } from '../../context/BlogContext';
// import BlogCard from '../../components/blog/BlogCard';

// const HomePage = () => {
//   const { blogs, fetchBlogs, loading, error } = useBlog();

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   useEffect(() => {
//     console.log('Current blogs:', blogs);
//   }, [blogs]);

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>
//         Error loading blogs: {error}
//       </Typography>
//     );
//   }

//   return (
//     <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
//       <Typography variant="h4" gutterBottom sx={{ color: '#6a0dad' }}>
//         Recent Travel Stories
//       </Typography>
      
//       {blogs && blogs.length > 0 ? (
//         blogs.map(blog => (
//           <BlogCard key={blog.id} blog={blog} />
//         ))
//       ) : (
//         <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
//           No blog posts found. Be the first to share your travel story!
//         </Typography>
//       )}
//     </Box>
//   );
// };

// export default HomePage;





// import { useEffect } from 'react';
// import { Box, Typography, CircularProgress, Button, Stack } from '@mui/material';
// import { useBlog } from '../../context/BlogContext';
// import { useAuth } from '../../context/AuthContext';
// import BlogCard from '../../components/blog/BlogCard';
// import { Link } from 'react-router-dom';

// const HomePage = () => {
//   const { blogs, fetchUserFeed, loading, error } = useBlog();
//   const { user } = useAuth();

//   useEffect(() => {
//     if (user) {
//       fetchUserFeed();
//     }
//   }, [user]);

//   if (!user) {
//     return (
//       <Box
//         sx={{
//           minHeight: '85vh',
//           backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80)',
//           backgroundSize: 'fixed',
//           backgroundPosition: 'fixed',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           textAlign: 'center',
//           p: 3,
//           color: 'white',
//           '&::before': {
//             content: '""',
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: 'rgba(73, 64, 64, 0.5)',
//             zIndex: 0,
//           },
//         }}
//       >
//         <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 800 }}>
//           <Typography 
//             variant="h2" 
//             gutterBottom 
//             sx={{ 
//               fontWeight: 'bold',
//               textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
//               mb: 4
//             }}
//           >
//             Welcome to Travel Stories
//           </Typography>
//           <Typography 
//             variant="h5" 
//             sx={{ 
//               mb: 4,
//               textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
//             }}
//           >
//             Discover and share your travel adventures
//           </Typography>
//           <Stack direction="row" spacing={2} justifyContent="center">
//             <Button 
//               component={Link}
//               to="/login"
//               variant="contained"
//               size="large"
//               sx={{
//                 backgroundColor: '#6a0dad',
//                 '&:hover': {
//                   backgroundColor: '#5a0ba5'
//                 }
//               }}
//             >
//               Log In
//             </Button>
//             <Button 
//               component={Link}
//               to="/register"
//               variant="outlined"
//               size="large"
//               sx={{
//                 color: 'white',
//                 borderColor: 'white',
//                 '&:hover': {
//                   backgroundColor: 'rgba(255,255,255,0.1)',
//                   borderColor: 'white'
//                 }
//               }}
//             >
//               Register
//             </Button>
//           </Stack>
//         </Box>
//       </Box>
//     );
//   }

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>
//         Error loading feed: {error}
//       </Typography>
//     );
//   }

//   return (
//     <Box sx={{ 
//       maxWidth: 800, 
//       mx: 'auto', 
//       p: 10, 
//       pb: 7,
//       background: 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.95))',
//       minHeight: '100vh'
//     }}>
//       <Typography 
//         variant="h4" 
//         gutterBottom 
//         sx={{ 
//           color: '#6a0daf',
//           fontWeight: 'bold',
//           fontFamily: 'Ancizar Serif',
//           textAlign: 'center',
//           mb: 4
//         }}
//       >
//         Following Feed
//       </Typography>
      
//       {blogs && blogs.length > 0 ? (
//         blogs.map(blog => (
//           <BlogCard key={blog.id} blog={blog} />
//         ))
//       ) : (
//         <Box sx={{ 
//           textAlign: 'center', 
//           mt: 4,
//           p: 4,
//           borderRadius: 2,
//           backgroundColor: 'rgba(106, 13, 173, 0.05)'
//         }}>
//           <Typography variant="h6" sx={{ mb: 2 }}>
//             No posts from users you follow yet.
//           </Typography>
//           <Typography variant="body1" sx={{ mb: 3 }}>
//             Start following more users or explore public posts
//           </Typography>
//           <Button 
//             component={Link}
//             to="/blogs"
//             variant="contained"
//             sx={{
//               backgroundColor: '#6a0dad',
//               '&:hover': {
//                 backgroundColor: '#5a0ba5'
//               }
//             }}
//           >
//             Explore Posts
//           </Button>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default HomePage;



import { useEffect } from 'react';
import { Box, Typography, CircularProgress, Button, Stack } from '@mui/material';
import { useBlog } from '../../context/BlogContext';
import { useAuth } from '../../context/AuthContext';
import BlogCard from '../../components/blog/BlogCard';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { blogs, fetchUserFeed, loading, error } = useBlog();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserFeed();
    }
  }, [user]);

  if (!user) {
    return (
      <Box
        sx={{
          minHeight: '85vh',
          backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          p: 3,
          color: 'white',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(73, 64, 64, 0.5)',
            zIndex: 0,
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 800 }}>
          <Typography 
            variant="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              mb: 4
            }}
          >
            Welcome to Travel Tales
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4,
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            Discover and share your travel adventures
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button 
              component={Link}
              to="/login"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#6a0dad',
                '&:hover': {
                  backgroundColor: '#5a0ba5'
                }
              }}
            >
              Log In
            </Button>
            <Button 
              component={Link}
              to="/register"
              variant="outlined"
              size="large"
              sx={{
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: 'white'
                }
              }}
            >
              Register
            </Button>
          </Stack>
        </Box>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'rgba(240, 230, 250, 0.5)' // Light purple background
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'rgba(240, 230, 250, 0.5)' // Light purple background
      }}>
        <Typography color="error" variant="h6" sx={{ mb: 2 }}>
          Error loading feed:
        </Typography>
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: 'rgb(252, 252, 252)', // Light purple background
      backgroundImage: 'url(https://media.istockphoto.com/id/2152660097/photo/tropical-paradise-beach-scene-for-background-or-wallpaper.webp?a=1&b=1&s=612x612&w=0&k=20&c=JIUS9xLQ-iIzIbhct339h025lfi9OkUvPNDNRqIbW_Q=)',
    }}>
      <Box sx={{ 
        maxWidth: 990, 
        mx: 'auto', 
        p: { xs: 2, md: 10 },
        py: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.61)',
        boxShadow: '0 0 20px rgba(0,0,0,0.1)',
        minHeight: '100vh',
      
      }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            color: '#050505',
            fontWeight: 'bold',
            textAlign: 'center',
            fontStyle: 'italic',
            mb: 4
          }}
        >
          Following Feed
        </Typography>
        
        {blogs && blogs.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {blogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </Box>
        ) : (
          <Box sx={{ 
            textAlign: 'center', 
            mt: 4,
            p: 4,
            borderRadius: 2,
            backgroundColor: 'rgba(106, 13, 173, 0.05)'
          }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              No posts from users you follow yet.
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Start following more users or explore public posts
            </Typography>
            <Button 
              component={Link}
              to="/blogs"
              variant="contained"
              sx={{
                backgroundColor: '#6a0dad',
                '&:hover': {
                  backgroundColor: '#5a0ba5'
                }
              }}
            >
              Explore Posts
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
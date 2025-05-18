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


import { useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useBlog } from '../../context/BlogContext';
import BlogCard from '../../components/blog/BlogCard';

const HomePage = () => {
  const { blogs, fetchBlogs, loading, error } = useBlog();

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    console.log('Current blogs:', blogs);
  }, [blogs]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>
        Error loading blogs: {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#6a0dad' }}>
        Recent Travel Stories
      </Typography>
      
      {blogs && blogs.length > 0 ? (
        blogs.map(blog => (
          <BlogCard key={blog.id} blog={blog} />
        ))
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
          No blog posts found. Be the first to share your travel story!
        </Typography>
      )}
    </Box>
  );
};

export default HomePage;

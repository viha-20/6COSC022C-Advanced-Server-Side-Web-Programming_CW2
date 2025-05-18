// import { useEffect } from 'react';
// import { useBlog } from '../../context/BlogContext';
// import BlogCard from '../../components/blog/BlogCard';
// import { Box, Typography, TextField, InputAdornment, Container } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { useState } from 'react';

// const BlogListPage = () => {
//   const { blogs, fetchBlogs, searchBlogPosts } = useBlog();
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       await searchBlogPosts(searchQuery);
//     } else {
//       fetchBlogs();
//     }
//   };

//   return (
//     <Container maxWidth="md">
//       <Box sx={{ my: 4 }}>
//         <Typography variant="h4" gutterBottom sx={{ color: '#6a0dad' }}>
//           Explore Travel Stories
//         </Typography>
        
//         <Box component="form" onSubmit={handleSearch} sx={{ mb: 4 }}>
//           <TextField
//             fullWidth
//             placeholder="Search blogs..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>
        
//         {blogs.length > 0 ? (
//           blogs.map(blog => (
//             <BlogCard key={blog.id} blog={blog} />
//           ))
//         ) : (
//           <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
//             No blog posts found. Be the first to share your travel story!
//           </Typography>
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default BlogListPage;



import { useEffect } from 'react';
import { useBlog } from '../../context/BlogContext';
import BlogCard from '../../components/blog/BlogCard';
import { Box, Typography, TextField, InputAdornment, Container, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const BlogListPage = () => {
  const { blogs, fetchBlogs, searchBlogPosts } = useBlog();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await searchBlogPosts(searchQuery);
    } else {
      fetchBlogs();
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ color: '#6a0dad' }}>
            Explore Travel Stories
          </Typography>
          {user && (
            <Button
              component={Link}
              to="/create-blog"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: '#6a0dad',
                '&:hover': {
                  backgroundColor: '#5a0ba5'
                }
              }}
            >
              Create Post
            </Button>
          )}
        </Box>
        
        <Box component="form" onSubmit={handleSearch} sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        {blogs && blogs.length > 0 ? (
          blogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
            No blog posts found. {user && 'Be the first to share your travel story!'}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default BlogListPage;
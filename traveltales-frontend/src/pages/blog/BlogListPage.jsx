// import { useEffect, useState } from 'react';
// import { useBlog } from '../../context/BlogContext';
// import BlogCard from '../../components/blog/BlogCard';
// import { 
//   Box, 
//   Typography, 
//   TextField, 
//   InputAdornment, 
//   Container, 
//   Button,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   ToggleButtonGroup,
//   ToggleButton
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import AddIcon from '@mui/icons-material/Add';
// import { useAuth } from '../../context/AuthContext';
// import { Link } from 'react-router-dom';
// import CircularProgress from '@mui/material/CircularProgress';

// const BlogListPage = () => {
//   const { blogs, fetchBlogs, searchBlogPosts, loading } = useBlog();
//   const { user } = useAuth();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortOption, setSortOption] = useState('newest');
//   const [searchType, setSearchType] = useState('country'); // 'country' or 'username'

//   useEffect(() => {
//     fetchBlogs(sortOption);
//   }, [sortOption]);

// const handleSearch = async (e) => {
//   e.preventDefault();
//   if (searchQuery.trim()) {
//     try {
//       // Create search params based on searchType
//       const searchParams = {};
//       if (searchType === 'country') {
//         searchParams.country = searchQuery.trim();
//       } else {
//         searchParams.username = searchQuery.trim();
//       }
      
//       console.log("Searching with:", searchParams); // Debug log
//       await searchBlogPosts(searchParams);
//     } catch (error) {
//       console.error("Search failed:", error);
//       // Error is already handled in the context
//     }
//   } else {
//     fetchBlogs(sortOption);
//   }
// };

//   const handleSortChange = (event) => {
//     setSortOption(event.target.value);
//   };

//   const handleSearchTypeChange = (event, newSearchType) => {
//     if (newSearchType !== null) {
//       setSearchType(newSearchType);
//     }
//   };

//   return (
//     <Container maxWidth="md">
//       <Box sx={{ my: 4 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
//           <Typography variant="h4" sx={{ color: '#6a0dad' }}>
//             Explore Travel Stories
//           </Typography>
//           {user && (
//             <Button
//               component={Link}
//               to="/create-blog"
//               variant="contained"
//               startIcon={<AddIcon />}
//               sx={{
//                 backgroundColor: '#6a0dad',
//                 '&:hover': {
//                   backgroundColor: '#5a0ba5'
//                 }
//               }}
//             >
//               CREATE POST
//             </Button>
//           )}
//         </Box>
        
//         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
//           <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', gap: 2 }}>
//             <TextField
//               fullWidth
//               placeholder={`Search by ${searchType === 'country' ? 'country' : 'username'}...`}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <Button 
//               type="submit" 
//               variant="contained"
//               sx={{
//                 backgroundColor: '#6a0dad',
//                 '&:hover': {
//                   backgroundColor: '#5a0ba5'
//                 }
//               }}
//             >
//               Search
//             </Button>
//           </Box>
          
//           <ToggleButtonGroup
//             value={searchType}
//             exclusive
//             onChange={handleSearchTypeChange}
//             aria-label="search type"
//             sx={{ alignSelf: 'flex-start' }}
//           >
//             <ToggleButton value="country" aria-label="search by country">
//               By Country
//             </ToggleButton>
//             <ToggleButton value="username" aria-label="search by username">
//               By Author
//             </ToggleButton>
//           </ToggleButtonGroup>
//         </Box>
        
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//           <FormControl sx={{ minWidth: 180 }}>
//             <InputLabel id="sort-select-label">Sort By</InputLabel>
//             <Select
//               labelId="sort-select-label"
//               id="sort-select"
//               value={sortOption}
//               label="Sort By"
//               onChange={handleSortChange}
//               sx={{
//                 '& .MuiSelect-select': {
//                   py: 1.5,
//                 }
//               }}
//             >
//               <MenuItem value="newest">Newest First</MenuItem>
//               <MenuItem value="most_liked">Most Liked</MenuItem>
//               <MenuItem value="most_commented">Most Commented</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
        
//         {loading ? (
//           <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
//             <CircularProgress />
//           </Box>
//         ) : blogs && blogs.length > 0 ? (
//           blogs.map(blog => (
//             <BlogCard key={blog.id} blog={blog} />
//           ))
//         ) : (
//           <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
//             No blog posts found. {user && 'Be the first to share your travel story!'}
//           </Typography>
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default BlogListPage;




import { useEffect, useState } from 'react';
import { useBlog } from '../../context/BlogContext';
import BlogCard from '../../components/blog/BlogCard';
import { 
  Box, 
  Typography, 
  TextField, 
  InputAdornment, 
  Container, 
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom theme with Facebook-like colors and typography
const theme = createTheme({
  palette: {
    primary: {
      main: '#1877f2', // Facebook blue
    },
    secondary: {
      main: '#42b72a', // Facebook green
    },
    background: {
      default: '#f0f2f5', // Facebook background
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif'
    ].join(','),
    h4: {
      fontWeight: 700,
      color: '#050505', // Facebook dark text
    },
    body1: {
      color: '#65676b', // Facebook secondary text
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          }
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 20,
            backgroundColor: '#f0f2f5',
          },
        },
      },
    },
  },
});

const BlogListPage = () => {
  const { blogs, fetchBlogs, searchBlogPosts, loading } = useBlog();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [searchType, setSearchType] = useState('country');

  useEffect(() => {
    fetchBlogs(sortOption);
  }, [sortOption]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        const searchParams = {};
        if (searchType === 'country') {
          searchParams.country = searchQuery.trim();
        } else {
          searchParams.username = searchQuery.trim();
        }
        await searchBlogPosts(searchParams);
      } catch (error) {
        console.error("Search failed:", error);
      }
    } else {
      fetchBlogs(sortOption);
    }
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSearchTypeChange = (event, newSearchType) => {
    if (newSearchType !== null) {
      setSearchType(newSearchType);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: '#f0f2f5', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="md">
          <Paper elevation={0} sx={{ borderRadius: 2, p: 4, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, fontStyle: 'italic', color: '#050505' }}>
                Travel Stories
              </Typography>
              {user && (
                <Button
                  component={Link}
                  to="/create-blog"
                  variant="contained"
                  color="secondary"
                  startIcon={<AddIcon />}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                  }}
                >
                  Create Post
                </Button>
              )}
            </Box>
            
            <Box component="form" onSubmit={handleSearch} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                  fullWidth
                  placeholder={`Search by ${searchType === 'country' ? 'country' : 'username'}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: 20,
                      backgroundColor: '#f0f2f5',
                    }
                  }}
                  variant="outlined"
                />
                <Button 
                  type="submit" 
                  variant="contained"
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: 2,
                  }}
                >
                  Search
                </Button>
              </Box>
              
              <ToggleButtonGroup
                value={searchType}
                exclusive
                onChange={handleSearchTypeChange}
                aria-label="search type"
                sx={{ mt: 2 }}
              >
                <ToggleButton 
                  value="country" 
                  aria-label="search by country"
                  sx={{
                    textTransform: 'none',
                    px: 2,
                    py: 0.5,
                    '&.Mui-selected': {
                      backgroundColor: '#a18dba',
                      color: '#1877f2',
                    }
                  }}
                >
                  By Country
                </ToggleButton>
                <ToggleButton 
                  value="username" 
                  aria-label="search by username"
                  sx={{
                    textTransform: 'none',
                    px: 2,
                    py: 0.5,
                    '&.Mui-selected': {
                      backgroundColor: '#a18dba',
                      color: '#1877f2',
                    }
                  }}
                >
                  By Author
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <FormControl sx={{ minWidth: 180 }} size="small">
                <InputLabel id="sort-select-label">Sort By</InputLabel>
                <Select
                  labelId="sort-select-label"
                  id="sort-select"
                  value={sortOption}
                  label="Sort By"
                  onChange={handleSortChange}
                  sx={{
                    borderRadius: 2,
                    '& .MuiSelect-select': {
                      py: 1,
                    }
                  }}
                >
                  <MenuItem value="newest">Newest First</MenuItem>
                  <MenuItem value="most_liked">Most Liked</MenuItem>
                  <MenuItem value="most_commented">Most Commented</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Paper>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress color="primary" />
            </Box>
          ) : blogs && blogs.length > 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {blogs.map(blog => (
                <Paper key={blog.id} elevation={0} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                  <BlogCard blog={blog} />
                </Paper>
              ))}
            </Box>
          ) : (
            <Paper elevation={0} sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
              <Typography variant="body1" sx={{ color: '#65676b' }}>
                No blog posts found. {user && 'Be the first to share your travel story!'}
              </Typography>
            </Paper>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default BlogListPage;
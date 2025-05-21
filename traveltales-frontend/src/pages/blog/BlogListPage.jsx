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
//   InputLabel
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import AddIcon from '@mui/icons-material/Add';
// import { useAuth } from '../../context/AuthContext';
// import { Link } from 'react-router-dom';

// const BlogListPage = () => {
//   const { blogs, fetchBlogs, searchBlogPosts } = useBlog();
//   const { user } = useAuth();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortOption, setSortOption] = useState('newest');

//   useEffect(() => {
//     fetchBlogsWithSort();
//   }, [sortOption]);

//   const fetchBlogsWithSort = async () => {
//     let endpoint = '/api/blogs';
//     if (sortOption === 'most_liked') {
//       endpoint = '/api/blogs?sort=most_liked';
//     } else if (sortOption === 'most_commented') {
//       endpoint = '/api/blogs?sort=most_commented';
//     }
//     await fetchBlogs(endpoint);
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       await searchBlogPosts(searchQuery);
//     } else {
//       fetchBlogsWithSort();
//     }
//   };

//   const handleSortChange = (event) => {
//     setSortOption(event.target.value);
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
        
//         <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
//           <Box component="form" onSubmit={handleSearch} sx={{ flexGrow: 1 }}>
//             <TextField
//               fullWidth
//               placeholder="Search blogs..."
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
//           </Box>
          
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
        
//         {blogs && blogs.length > 0 ? (
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
//   InputLabel
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

//   useEffect(() => {
//     fetchBlogs(sortOption);
//   }, [sortOption]);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       await searchBlogPosts(searchQuery);
//     } else {
//       fetchBlogs(sortOption);
//     }
//   };

//   const handleSortChange = (event) => {
//     setSortOption(event.target.value);
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
        
//         <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
//           <Box component="form" onSubmit={handleSearch} sx={{ flexGrow: 1 }}>
//             <TextField
//               fullWidth
//               placeholder="Search blogs..."
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
//           </Box>
          
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
  ToggleButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const BlogListPage = () => {
  const { blogs, fetchBlogs, searchBlogPosts, loading } = useBlog();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [searchType, setSearchType] = useState('country'); // 'country' or 'username'

  useEffect(() => {
    fetchBlogs(sortOption);
  }, [sortOption]);

const handleSearch = async (e) => {
  e.preventDefault();
  if (searchQuery.trim()) {
    try {
      // Create search params based on searchType
      const searchParams = {};
      if (searchType === 'country') {
        searchParams.country = searchQuery.trim();
      } else {
        searchParams.username = searchQuery.trim();
      }
      
      console.log("Searching with:", searchParams); // Debug log
      await searchBlogPosts(searchParams);
    } catch (error) {
      console.error("Search failed:", error);
      // Error is already handled in the context
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
              CREATE POST
            </Button>
          )}
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
          <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              placeholder={`Search by ${searchType === 'country' ? 'country' : 'username'}...`}
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
            <Button 
              type="submit" 
              variant="contained"
              sx={{
                backgroundColor: '#6a0dad',
                '&:hover': {
                  backgroundColor: '#5a0ba5'
                }
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
            sx={{ alignSelf: 'flex-start' }}
          >
            <ToggleButton value="country" aria-label="search by country">
              By Country
            </ToggleButton>
            <ToggleButton value="username" aria-label="search by username">
              By Author
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel id="sort-select-label">Sort By</InputLabel>
            <Select
              labelId="sort-select-label"
              id="sort-select"
              value={sortOption}
              label="Sort By"
              onChange={handleSortChange}
              sx={{
                '& .MuiSelect-select': {
                  py: 1.5,
                }
              }}
            >
              <MenuItem value="newest">Newest First</MenuItem>
              <MenuItem value="most_liked">Most Liked</MenuItem>
              <MenuItem value="most_commented">Most Commented</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : blogs && blogs.length > 0 ? (
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
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useBlog } from '../../context/BlogContext';
// import { TextField, Button, Box, Typography, Paper, MenuItem } from '@mui/material';
// import CountrySelect from '../country/CountrySelect';
// import { getAllCountries } from '../../api/country';

// const BlogCreateForm = () => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [country, setCountry] = useState('');
//   const [visitDate, setVisitDate] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [countries, setCountries] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const { createBlogPost } = useBlog();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await getAllCountries();
//         setCountries(response.data);
//       } catch (err) {
//         console.error('Failed to fetch countries:', err);
//       }
//     };
//     fetchCountries();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
    
//     try {
//       await createBlogPost({
//         title,
//         content,
//         country,
//         visit_date: visitDate,
//         image_url: imageUrl
//       });
//       navigate('/');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to create blog post');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
//       <Typography variant="h5" gutterBottom sx={{ color: '#6a0dad' }}>
//         Create New Blog Post
//       </Typography>
      
//       {error && (
//         <Typography color="error" sx={{ mb: 2 }}>
//           {error}
//         </Typography>
//       )}
      
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Title"
//           fullWidth
//           margin="normal"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
        
//         <TextField
//           label="Content"
//           fullWidth
//           margin="normal"
//           multiline
//           rows={6}
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           required
//         />
        
//         <CountrySelect 
//           value={country}
//           onChange={(e) => setCountry(e.target.value)}
//           countries={countries}
//         />
        
//         <TextField
//           label="Visit Date"
//           type="date"
//           fullWidth
//           margin="normal"
//           InputLabelProps={{ shrink: true }}
//           value={visitDate}
//           onChange={(e) => setVisitDate(e.target.value)}
//           required
//         />
        
//         <TextField
//           label="Image URL (optional)"
//           fullWidth
//           margin="normal"
//           value={imageUrl}
//           onChange={(e) => setImageUrl(e.target.value)}
//         />
        
//         <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
//           <Button
//             type="submit"
//             variant="contained"
//             disabled={loading}
//             sx={{ 
//               backgroundColor: '#6a0dad',
//               '&:hover': {
//                 backgroundColor: '#5a0ba5'
//               }
//             }}
//           >
//             {loading ? 'Creating...' : 'Create Post'}
//           </Button>
//         </Box>
//       </form>
//     </Box>
//   );
// };

// export default BlogCreateForm;
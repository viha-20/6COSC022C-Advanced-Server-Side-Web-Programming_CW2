import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  CircularProgress
} from '@mui/material';
import { useBlog } from '../../context/BlogContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../api';

const EditBlogPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [countryName, setCountryName] = useState('');
  const [dateOfVisit, setDateOfVisit] = useState('');
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [error, setError] = useState(null);
  const { updateBlogPost, fetchBlogById, currentBlog } = useBlog();
  const { user, apiKey } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadBlogData = async () => {
      try {
        setLoading(true);
        await fetchBlogById(id);
      } catch (err) {
        console.error('Failed to load blog:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    loadBlogData();
  }, [id]);

  useEffect(() => {
    if (currentBlog) {
      setTitle(currentBlog.title);
      setContent(currentBlog.content);
      setCountryName(currentBlog.country_name);
      setDateOfVisit(currentBlog.date_of_visit?.split('T')[0] || '');
    }
  }, [currentBlog]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setCountriesLoading(true);
        setError(null);
        
        if (!apiKey) {
          throw new Error('Authentication required');
        }

        const response = await api.get('/countries', {
          headers: {
            'x-api-key': apiKey,
            'Content-Type': 'application/json'
          }
        });

        const countriesData = Array.isArray(response.data) 
          ? response.data 
          : (response.data?.data && Array.isArray(response.data.data)) 
            ? response.data.data 
            : [];

        if (countriesData.length === 0) {
          throw new Error('No countries found in response');
        }

        setCountries(countriesData);
      } catch (error) {
        console.error('Detailed fetch error:', {
          message: error.message,
          response: error.response?.data,
          config: error.config
        });
        setError('Failed to load countries. Please try again later.');
      } finally {
        setCountriesLoading(false);
      }
    };

    if (apiKey) {
      fetchCountries();
    } else {
      setError('Authentication required to load countries');
      setCountriesLoading(false);
    }
  }, [apiKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!countryName) {
      setError('Please select a country');
      return;
    }
    
    setLoading(true);
    try {
      await updateBlogPost(id, {
        title,
        content,
        country_name: countryName,
        date_of_visit: dateOfVisit
      }, apiKey);
      navigate(`/blogs/${id}`);
    } catch (error) {
      console.error('Error updating blog post:', error);
      setError(error.response?.data?.message || error.message || 'Failed to update blog post');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !currentBlog) return <CircularProgress />;
  if (!currentBlog) return <div>Blog post not found</div>;
  if (user?.id !== currentBlog.user_id) return <div>You are not authorized to edit this post</div>;

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" sx={{ color: '#6a0dad', mb: 4 }}>
          Edit Blog Post
        </Typography>
        
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          
          <TextField
            fullWidth
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={6}
            required
          />
          
          <FormControl fullWidth required error={!countryName && !!error}>
            <InputLabel id="country-label">Country</InputLabel>
            {countriesLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                <CircularProgress size={24} />
              </Box>
            ) : (
              <Select
                labelId="country-label"
                value={countryName}
                label="Country"
                onChange={(e) => setCountryName(e.target.value)}
                required
              >
                {countries?.map((country) => (
                  <MenuItem 
                    key={country.name || country} 
                    value={country.name || country}
                  >
                    {country.name || country}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FormControl>
          
          <TextField
            fullWidth
            label="Date of Visit"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={dateOfVisit}
            onChange={(e) => setDateOfVisit(e.target.value)}
            required
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button 
              variant="outlined" 
              onClick={() => navigate(`/blogs/${id}`)}
              sx={{ color: '#6a0dad', borderColor: '#6a0dad' }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={loading || countriesLoading}
              sx={{ 
                backgroundColor: '#6a0dad',
                '&:hover': {
                  backgroundColor: '#5a0ba5'
                }
              }}
            >
              {loading ? 'Updating...' : 'Update Post'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EditBlogPage;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import api from '../../api'; // Make sure this is imported

const CreateBlogPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [countryName, setCountryName] = useState('');
  const [dateOfVisit, setDateOfVisit] = useState('');
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [error, setError] = useState(null);
  const { createBlogPost } = useBlog();
  const { apiKey } = useAuth();
  const navigate = useNavigate();

useEffect(() => {
  const fetchCountries = async () => {
    try {
      setCountriesLoading(true);
      setError(null);
      
      if (!apiKey) {
        throw new Error('Authentication required');
      }

      console.log('Making request with API key:', apiKey); // Debug log

      const response = await api.get('/countries', {
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json'
        }
      });

      console.log('Countries response:', response.data); // Debug log

      // Handle different response formats
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
      await createBlogPost({
        title,
        content,
        country_name: countryName,
        date_of_visit: dateOfVisit
      });
      navigate('/blogs');
    } catch (error) {
      console.error('Error creating blog post:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" sx={{ color: '#6a0dad', mb: 4 }}>
          Create New Blog Post
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
              onClick={() => navigate('/blogs')}
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
              {loading ? 'Publishing...' : 'Publish Post'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateBlogPage;
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        px: 2, 
        mt: 'auto', 
        backgroundColor: '#6a0dad',
        color: 'white',
        textAlign: 'center'
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} TravelTales - Share your travel stories
      </Typography>
    </Box>
  );
};

export default Footer;
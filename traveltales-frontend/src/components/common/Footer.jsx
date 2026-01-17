import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 2, 
        px: 2, 
        backgroundColor: 'rgba(83, 44, 109, 0.878)',
        color: 'white',
        textAlign: 'center',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        zIndex: 999,
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.1)'
      }}
    >
      <Typography variant="body2" sx={{ letterSpacing: '1px' }}>
        © {new Date().getFullYear()} TravelTales - Share your travel stories
      </Typography>
    </Box>
  );
};

export default Footer;
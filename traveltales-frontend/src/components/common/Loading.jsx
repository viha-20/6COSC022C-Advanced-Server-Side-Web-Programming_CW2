import { CircularProgress, Box } from '@mui/material';

const Loading = () => {
  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <CircularProgress sx={{ color: '#6a0dad' }} />
    </Box>
  );
};

export default Loading;
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { TextField, Button, Box, Typography, Paper } from '@mui/material';
// import { Link } from 'react-router-dom';

// const RegisterForm = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     try {
//       await register({ username, email, password });
//       navigate('/');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed');
//     }
//   };

//   return (
//     <Box 
//       sx={{ 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         minHeight: '80vh' 
//       }}
//     >
//       <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
//         <Typography variant="h5" component="h1" gutterBottom sx={{ color: '#6a0dad' }}>
//           Create Account
//         </Typography>
        
//         {error && (
//           <Typography color="error" sx={{ mb: 2 }}>
//             {error}
//           </Typography>
//         )}
        
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Username"
//             fullWidth
//             margin="normal"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//           <TextField
//             label="Email"
//             type="email"
//             fullWidth
//             margin="normal"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <TextField
//             label="Password"
//             type="password"
//             fullWidth
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
          
//           <Box sx={{ mt: 2 }}>
//             <Typography variant="body2">
//               Already have an account?{' '}
//               <Link to="/login" style={{ color: '#6a0dad' }}>
//                 Sign in
//               </Link>
//             </Typography>
//           </Box>
          
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ 
//               mt: 3, 
//               mb: 2, 
//               backgroundColor: '#6a0dad',
//               '&:hover': {
//                 backgroundColor: '#5a0ba5'
//               }
//             }}
//           >
//             Register
//           </Button>
//         </form>
//       </Paper>
//     </Box>
//   );
// };

// export default RegisterForm;



import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await register({ username, email, password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <Paper 
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 3,
          position: 'relative',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '8px',
        }}
      >
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 1,
            color: '#333'
          }}
        >
          Community
        </Typography>
        
        <Typography 
          variant="body2" 
          sx={{ 
            textAlign: 'center',
            mb: 3,
            color: '#666'
          }}
        >
          Create your account to start sharing travel stories
        </Typography>

        {error && (
          <Typography 
            color="error" 
            sx={{ 
              mb: 2,
              textAlign: 'center',
              fontSize: '0.8rem',
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
              p: 1,
              borderRadius: 1
            }}
          >
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            margin="dense"
            size="small"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            sx={{ mb: 1.5 }}
          />
          
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="dense"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mb: 1.5 }}
          />
          
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="dense"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 2 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              py: 1,
              mb: 2,
              backgroundColor: '#6a0dad',
              '&:hover': {
                backgroundColor: '#5a0ba5',
              },
            }}
          >
            Register
          </Button>

          <Typography 
            variant="body2" 
            sx={{ 
              textAlign: 'center',
              color: '#666'
            }}
          >
            Already have an account?{' '}
            <Link 
              to="/login" 
              style={{ 
                color: '#6a0dad',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Sign In
            </Link>
          </Typography>
        </Box>

        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block',
            textAlign: 'center',
            mt: 3,
            color: '#999'
          }}
        >
          © 2025 TravelTales - Share your travel stories
        </Typography>
      </Paper>
    </Box>
  );
};

export default RegisterForm;
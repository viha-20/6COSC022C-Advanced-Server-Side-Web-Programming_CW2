import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import FlightIcon from '@mui/icons-material/Flight';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: 'rgb(97, 58, 145)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        zIndex: 1100
      }}
    >
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            fontWeight: 'bold',
            letterSpacing: '1px',
            py: 1,
          }}
        >
          <Link 
            to="/" 
            style={{ 
              textDecoration: 'none', 
              color: 'white',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {/* <TravelExploreIcon sx={{ mr: 1 }} /> */}
            <FlightIcon sx={{ mr: 1 }} />
            TravelTales
          </Link>
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton 
            color="inherit" 
            component={Link} 
            to="/"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            <HomeIcon />
          </IconButton>
          <IconButton 
            color="inherit" 
            component={Link} 
            to="/blogs"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            <TravelExploreIcon />
          </IconButton>
          
          {user ? (
            <>
              <IconButton 
                color="inherit" 
                component={Link} 
                to={`/profile/${user.id}`}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'scale(1.1)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <PersonIcon />
              </IconButton>
              <Button 
                color="inherit" 
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{
                  borderRadius: '20px',
                  px: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Logout
              </Button>
              
              <Avatar 
                alt={user.username.toUpperCase()} 
                src="/default-avatar.jpg" 
                sx={{ 
                  width: 36, 
                  height: 36,
                  backgroundColor: '#262529',
                  ml: 1,
                  border: '2px solid white',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: '0 0 10px rgba(255,255,255,0.5)'
                  },
                  transition: 'all 0.3s ease'
                }}
              />
            </>
          ) : (
            <Button 
              color="inherit" 
              startIcon={<LoginIcon />}
              component={Link} 
              to="/login"
              sx={{
                borderRadius: '20px',
                px: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
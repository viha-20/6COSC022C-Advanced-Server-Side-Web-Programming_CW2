import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';

const Navbar = () => {
  const { user } = useAuth();
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      sx={{ 
        width: '100%', 
        position: 'fixed', 
        top: 0, 
        backgroundColor: 'rgba(83, 79, 85, 0.9)',
        color: 'white',
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        '& .MuiBottomNavigationAction-root': {
          minWidth: '60px',
          padding: '6px 12px',
          transition: 'all 0.3s ease',
          '&.Mui-selected': {
            color: '#fff',
            transform: 'translateY(-2px)',
          },
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '8px'
          }
        }
      }}
    >
      {user && (
        <BottomNavigationAction 
          label="Following" 
          icon={<HomeIcon />} 
          component={Link} 
          to="/" 
          sx={{ color: 'white' }}
        />
      )}
      <BottomNavigationAction 
        label="Explore" 
        icon={<ExploreIcon />} 
        component={Link} 
        to="/blogs" 
        sx={{ color: 'white' }}
      />
      {user && (
        <BottomNavigationAction 
          label="Create" 
          icon={<AddCircleOutlineIcon />} 
          component={Link} 
          to="/create-blog" 
          sx={{ color: 'white' }}
        />
      )}
      <BottomNavigationAction 
        label="Profile" 
        icon={<PersonIcon />} 
        component={Link} 
        to={user ? `/profile/${user.id}` : '/login'} 
        sx={{ color: 'white' }}
      />
    </BottomNavigation>
  );
};

export default Navbar;
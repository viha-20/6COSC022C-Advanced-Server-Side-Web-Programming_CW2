// import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { BottomNavigation, BottomNavigationAction } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import ExploreIcon from '@mui/icons-material/Explore';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import PersonIcon from '@mui/icons-material/Person';
// import { useState } from 'react';

// const Navbar = () => {
//   const { user } = useAuth();
//   const [value, setValue] = useState(0);

//   return (
//     <BottomNavigation
//       value={value}
//       onChange={(event, newValue) => {
//         setValue(newValue);
//       }}
//       showLabels
//       sx={{ 
//         width: '100%', 
//         position: 'fixed', 
//         bottom: 0, 
//         backgroundColor: '#6a0dad',
//         color: 'white',
//         zIndex: 1000
//       }}
//     >
//       <BottomNavigationAction 
//         label="Home" 
//         icon={<HomeIcon />} 
//         component={Link} 
//         to="/" 
//         sx={{ color: 'white' }}
//       />
//       <BottomNavigationAction 
//         label="Explore" 
//         icon={<ExploreIcon />} 
//         component={Link} 
//         to="/blogs" 
//         sx={{ color: 'white' }}
//       />
//       {user && (
//         <BottomNavigationAction 
//           label="Create" 
//           icon={<AddCircleOutlineIcon />} 
//           component={Link} 
//           to="/create-blog" 
//           sx={{ color: 'white' }}
//         />
//       )}
//       <BottomNavigationAction 
//         label="Profile" 
//         icon={<PersonIcon />} 
//         component={Link} 
//         to={user ? `/profile/${user.id}` : '/login'} 
//         sx={{ color: 'white' }}
//       />
//     </BottomNavigation>
//   );
// };

// export default Navbar;




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
        bottom: 0, 
        backgroundColor: '#6a0dad',
        color: 'white',
        zIndex: 1000
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
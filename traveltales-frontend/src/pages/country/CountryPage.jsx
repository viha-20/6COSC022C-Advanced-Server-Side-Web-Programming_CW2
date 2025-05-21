// import { useState, useEffect } from 'react'; // Add this import
// import { TextField, Button, Box, Typography, Card, CardContent, MenuItem } from '@mui/material';
// import { getAllCountries, getCountryDetails } from '../../api/country';

// const CountryPage = () => {
//   const [countries, setCountries] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [loading, setLoading] = useState(false);

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

//   const handleCountrySelect = async (countryName) => {
//     setLoading(true);
//     try {
//       const response = await getCountryDetails(countryName);
//       setSelectedCountry(response.data);
//     } catch (err) {
//       console.error('Failed to fetch country details:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
//       <Typography variant="h4" gutterBottom sx={{ color: '#6a0dad' }}>
//         Country Information
//       </Typography>
      
//       <TextField
//         select
//         label="Select Country"
//         fullWidth
//         margin="normal"
//         onChange={(e) => handleCountrySelect(e.target.value)}
//       >
//         {countries.map((country) => (
//           <MenuItem key={country.name.common} value={country.name.common}>
//             {country.name.common}
//           </MenuItem>
//         ))}
//       </TextField>

//       {selectedCountry && (
//         <Card sx={{ mt: 3 }}>
//           <CardContent>
//             <Typography variant="h5">{selectedCountry.name.common}</Typography>
//             <Typography>Capital: {selectedCountry.capital}</Typography>
//             <Typography>Currency: {Object.values(selectedCountry.currencies)[0].name}</Typography>
//             <img 
//               src={selectedCountry.flags.png} 
//               alt={`Flag of ${selectedCountry.name.common}`} 
//               style={{ width: '100px', marginTop: '10px' }}
//             />
//           </CardContent>
//         </Card>
//       )}
//     </Box>
//   );
// };

// export default CountryPage;
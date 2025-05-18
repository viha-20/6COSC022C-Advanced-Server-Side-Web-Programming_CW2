import { TextField, MenuItem } from '@mui/material';

const CountrySelect = ({ value, onChange, countries }) => {
  return (
    <TextField
      select
      label="Country"
      fullWidth
      margin="normal"
      value={value}
      onChange={onChange}
      required
    >
      <MenuItem value="">
        <em>Select a country</em>
      </MenuItem>
      {countries.map((country) => (
        <MenuItem key={country.name.common} value={country.name.common}>
          {country.name.common}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CountrySelect;
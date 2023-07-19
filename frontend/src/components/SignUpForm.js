import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const SignUpForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Typography variant="h5">
          Sign Up
        </Typography>
        <TextField
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
        />
        <TextField
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
        />
        <TextField
          label="Business Name"
          variant="outlined"
          value={businessName}
          onChange={e => setBusinessName(e.target.value)}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button variant="contained" type="submit">
          Sign Up
        </Button>
      </Box>
    </form>
  );
};

export default SignUpForm;
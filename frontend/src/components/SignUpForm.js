import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';

const SignUpFormContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: 600,
  height: 400,
  padding: 24,
  boxSizing: 'border-box',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
  borderRadius: '4px', 
  backgroundColor: '#ffffff',
});

const StyledTextField = styled(TextField)({
  margin: '10px 0',
});

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
    <SignUpFormContainer>
      <Typography variant="h5" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              fullWidth
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              fullWidth
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
            />
          </Grid>
        </Grid>
        <StyledTextField
          fullWidth
          label="Business Name"
          variant="outlined"
          value={businessName}
          onChange={e => setBusinessName(e.target.value)}
          required
        />
        <StyledTextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button variant="contained" type="submit" style={{ marginTop: '20px' }}>
          Sign Up
        </Button>
      </form>
    </SignUpFormContainer>
  );
};

export default SignUpForm;

import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TopBar from './TopBar';
import SignUpForm from './SignUpForm';

const SignUpPage = () => {
  return (
    <Box>
      <TopBar title="Logo" buttonLabel="Create Your Business" link="/signup" />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SignUpForm />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUpPage;
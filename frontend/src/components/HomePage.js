import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TopBar from './TopBar';
import LoginForm from './LoginForm';

const HomePage = () => {
  return (
    <Box>
      <TopBar title="Logo" buttonLabel="Create Business" link="/signup" />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4">
            Welcome Words
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LoginForm />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
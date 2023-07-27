import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TopBar from './TopBar';
import SignUpForm from './SignUpForm';
import { styled } from '@mui/system';

// Define a styled Grid container to center the SignUpForm
const StyledGrid = styled(Grid)({
  height: 'calc(100vh - 64px)',  // 64px is assumed height of AppBar, adjust if needed
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const SignUpPage = () => {
  return (
    <Box>
      <TopBar buttonLabel="Log in" link="/" />
      <StyledGrid container>
        <Grid item xs={12} sm={6}>
          <SignUpForm />
        </Grid>
      </StyledGrid>
    </Box>
  );
};

export default SignUpPage;